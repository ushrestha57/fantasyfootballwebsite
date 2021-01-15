from fantasyfootballbackend import db
from fantasyfootballbackend import bcrypt
import json

owners = db.Table('owners',
    db.Column('username', db.String, db.ForeignKey('user.username')),
    db.Column('name', db.String(100), db.ForeignKey('player.name'))
)
class User(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    username = db.Column(db.String(20),unique = True)
    password = db.Column(db.String(20))
    players = db.relationship('Player', secondary = owners)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    def get_players(self):
        playerList = []
        for i in range(len(self.players)):
            playerList.append({
                "name" : self.players[i].name,
                "position" : self.players[i].position,
                "rank" : self.players[i].rank
            })
        return playerList


    @classmethod 
    def find_by_username(cls,username):
        return cls.query.filter_by(username = username).first()
    
    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'username': x.username,
                'password': x.password
            }
        return {'users': list(map(lambda x: to_json(x), User.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}
class Player(db.Model):
    name = db.Column(db.String(100), primary_key = True)
    position = db.Column(db.String(10))
    rank = db.Column(db.Integer)

class RevokedToken(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(300))

    def add(self):
        db.session.add(self)
        db.session.commit()


def is_jti_blacklisted(jti):
    query = RevokedToken.query.filter_by(jti = jti).first()
    return bool(query)

