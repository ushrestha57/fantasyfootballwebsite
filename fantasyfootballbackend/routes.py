from flask import render_template, url_for, flash, redirect, request, jsonify
import json
from fantasyfootballbackend import app,bcrypt,db,jwt
from fantasyfootballbackend.models import User,RevokedToken, is_jti_blacklisted, Player
from flask_jwt_extended import (create_access_token, get_jti,  create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

@app.before_first_request
def create_db():
    db.create_all()
    db.session.commit()



@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return is_jti_blacklisted(jti)

@app.route('/api/register', methods = ["POST"])
def register():
    data = json.loads(request.get_json()['body'])
    if User.find_by_username(data['username']):
            return {'msg': 'User {} already exists'.format(data['username'])}
        
    new_user = User(
        username = data['username'],
        password = bcrypt.generate_password_hash(data['password']),
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity = data['username'])
        refresh_token = create_refresh_token(identity = data['username'])
        return{
            'msg' : 'User {} successfully created!'.format(data['username']),
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    except:
        return {'msg': 'Unable to create user'},500
    
@app.route('/api/login',methods = ["POST"])
def login():
    data = json.loads(request.get_json()['body'])
    current_user = User.find_by_username(data['username'])

    if not current_user:
        return {'msg': 'User {} does not exist'.format(data['username'])}
    
    if bcrypt.check_password_hash(current_user.password,data['password']):
        access_token = create_access_token(identity = data['username'])
        return{
            'msg' : 'Logged in as {}'.format(data['username']),
            'access_token': access_token
        }
    else:
        return {'message': 'Invalid credentials'}

@app.route('/api/advice', methods = ["GET"])
@jwt_required
def advice():
    return {"placeholder": "holder"}
            #return getLeagueData(User.find_by_username(get_jwt_identity()))


@app.route('/api/team', methods = ["GET", "POST"])
@jwt_required
def team():
    user = User.query.filter_by(username = get_jwt_identity()).first()
    if request.method == "GET":
        return {"list" : user.get_players()}

    elif request.method == "POST":
        added_player = Player(request.get_json())
                
    else:
        return {"msg" : "Unable to access protected endpoint"},401

@app.route('/api/players', methods = ["GET","POST","DELETE"])
@jwt_required
def players():
    if request.method == "GET":
        playerList = []
        for player in Player.query.all():
            playerList.append({
                "name" : player.name,
                "position" : player.position,
                "rank" : player.rank
            })
        return {"players": playerList}

    elif request.method == "POST":
        added_player = Player(request.get_json())
                



@app.route('/api/refresh', methods = ["POST"])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    ret = {
        'access_token': create_access_token(identity=current_user)
    }
    return jsonify(ret), 200

@app.route('/api/loggedin', methods = ["GET"])
def loggedin():
    print(request)
    if request.headers.get('Authorization'):
        jti = request.headers.get('Authorization')
        jti = jti[7:(len(jti))]   
        if is_jti_blacklisted(jti):
            return { "msg" : "False"},401
        else:
            return {"msg": "True"}
    else:
        return {"msg" : "False"},401

@app.route('/api/logout', methods = ["POST"])
def logout():
    if request.headers.get('Authorization'):
        jti = request.headers.get('Authorization')
        jti = jti[7:(len(jti))]   
        if is_jti_blacklisted(jti):
            return { "msg" : "Already logged out!"},401
        else:
            old_token = RevokedToken(jti = jti)
            RevokedToken.add(old_token)
            return {"msg": "Successfully logged out"}
    else:
        return {"msg" : "Unable to log out"},401
    
  