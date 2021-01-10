from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

app = Flask(__name__, instance_relative_config=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config["SECRET_KEY"] = '\x00\xc4T\xc0\x93\xd5\xb0\xb1g\xf3\x8c*U^\xda`:\x19+\xc0'
app.config['JWT_BLACKLIST_ENABLED'] = True

jwt = JWTManager(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_ACCESS_LIFESPAN'] = {'minutes': 15}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

from fantasyfootballbackend import routes

