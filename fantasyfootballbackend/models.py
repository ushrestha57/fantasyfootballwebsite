from fantasyfootballbackend import db
from fantasyfootballbackend import bcrypt

class User(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    username = db.Column(db.String(20),unique = True)
    password = db.Column(db.String(20))
    league_id = db.Column(db.Text)
    s2 = db.Column(db.Text)
    swid = db.Column(db.Text)
    teamName = db.Column(db.Text)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
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

class RevokedToken(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(300))

    def add(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def is_jti_blacklisted(cls,jti):
        query = cls.query.filter_by(jti = jti).first()
        return bool(query)

