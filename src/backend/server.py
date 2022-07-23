<<<<<<< HEAD
import json
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin
from flask import jsonify

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# DATABASE SETUP
db = SQLAlchemy(app)
Migrate(app, db)


class users(db.Model):

    id_user = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.Text, nullable=False)
    lastName = db.Column(db.Text, nullable=False)
    dob = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    gender = db.Column(db.Text, nullable=False)
    age = db.Column(db.Text, nullable=False)
    properties = db.Column(db.Text)
    autherized_to = db.Column(db.Integer)

    def __init__(self, firstName, lastName, dob, email, password, gender, age, properties, autherized_to):
        self.firstName = firstName
        self.lastName = lastName
        self.dob = dob
        self.email = email
        self.password = password
        self.gender = gender
        self.age = age
        self.properties = properties
        self.autherized_to = autherized_to

    def get_id(self):
        return self.id_user


class properties(db.Model):

    id_property = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.Text, nullable=False)
    city = db.Column(db.Text, nullable=False)
    state = db.Column(db.Text, nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    estimate = db.Column(db.Integer, nullable=False)
    photos = db.Column(db.Text, nullable=False)
    videos = db.Column(db.Text, nullable=False)
    belongs_to = db.Column(db.Integer, db.ForeignKey(
        'users.id_user'), nullable=False)

    users = db.relationship('users', backref='user', uselist=False)

    def __init__(self, street, city, state, zipcode, description, estimate, photos, videos, belongs_to):
        self.street = street
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.description = description
        self.estimate = estimate
        self.photos = photos
        self.videos = videos
        self.belongs_to = belongs_to


class photos(db.Model):

    id_photo = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.Text, nullable=False)
    belongs_to = db.Column(db.Integer, db.ForeignKey(
        'properties.id_property'), nullable=False)

    properties = db.relationship(
        'properties', backref='photo_property', uselist=False)

    def __init__(self, path, belongs_to):
        self.path = path
        self.belongs_to = belongs_to


class videos(db.Model):

    id_video = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.Text, nullable=False)
    belongs_to = db.Column(db.Integer, db.ForeignKey(
        'properties.id_property'), nullable=False)

    properties = db.relationship(
        'properties', backref='video_property', uselist=False)

    def __init__(self, path, belongs_to):
        self.path = path
        self.belongs_to = belongs_to


@app.route("/hello")
def hello():
    return jsonify({'string': 'Hello World'})


@app.route("/add_user")
# this is for the sign in page, youll pass the following params and it will add the entry to the database
def add_user(firstname, lastname, dob, email, password, gender, age):
    user = users(firstname, lastname, dob, email,
                 generate_password_hash(password), gender, age, None, None)
    db.session.add(user)
    db.session.commit()
    return "User has been added"


@app.route("/delete_user")
def delete_user(user_id):  # on your end if a user wants to delete their account we store the id in the browser session so that is what you will pass to this function
    user = users.query.filter_by(id=user_id).first()
    user.delete()
    db.session.commit()
    return "User has been deleted"


@app.route("/edit_user")
def edit_user(user, firstname=None, lastname=None, dob=None, email=None, password=None, gender=None, age=None):
    # This goes down the list of params and if not specified it will not change the attribute
    if firstname != None:
        user.firstName = firstname
    if lastname != None:
        user.lastName = lastname
    if dob != None:
        user.dob = dob
    if email != None:
        user.email = email
    if password != None:
        user.password = generate_password_hash(password)
    if gender != None:
        user.firstName = gender
    if age != None:
        user.firstName = age

    db.session.commit()
    return "profile has been updated"


@app.route("/login_user")
def login_user(email, password):
    # find user will email they entered
    user = users.query.filter_by(email=email).first()
    if user:  # if a user is found
        # check pass entered vs hashed pass in the database
        if check_password_hash(user.password, password):
            return user.id  # if password hash matches we will return the user id
    else:
        return False  # if the password does not match return false here
    return False  # if no email matches it will return false here


@app.route("/get_user")
# for when you need to display user info this will let you grab it from their user id
def get_user(user_id):
    user = users.query.filter_by(id=user_id).first()
    return user


@app.route("/add_property")
# This is adding a property to the database
def add_property(user_id, street, city, state, zipcode, description, estimate, photos, videos):
    property = properties(street, city, state, zipcode,
                          description, estimate, photos, videos, user_id)
    db.session.add(property)
    db.session.commit()
    return "property has been added"


@app.route("/delete_property")
# we can change this to be like the user routes where we store only the id of the property and there will be a route to get the information (we will talk about that)
def delete_property(property):
    property.delete()
    db.session.commit()
    return "property has been deleted"


@app.route("/edit_property")
def edit_property(property=None, street=None, city=None, state=None, zipcode=None, description=None, estimate=None, photos=None, videos=None):
    # This goes down the list of params and if not specified it will not change the attribute
    if street != None:
        property.street = street
    if city != None:
        property.city = city
    if state != None:
        property.state = state
    if zipcode != None:
        property.zipcode = zipcode
    if description != None:
        property.description = description
    if estimate != None:
        property.estimate = estimate
    if photos != None:
        property.photos = photos
    if videos != None:
        property.videos = videos

    db.session.commit()
    return "property has been updated"

# For all of the video and photo functions

# When you give me a photo I will save it on the 'server' and save the path to the database
# When you request a photo or video I will return the file paths in a list


@app.route("/add_photo")
def add_photo():
    pass


@app.route("/add_video")
def add_video():
    pass


@app.route("/delete_photo")
def delete_photo():
    pass


@app.route("/delete_video")
def delete_video():
    pass


@app.route("/get_photos")
def get_photos():
    pass


@app.route("/add_videos")
def add_videos():
    pass
=======
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#DATABASE SETUP
db = SQLAlchemy(app)
Migrate(app, db)

class users(db.Model):

    id_user = db.Column(db.Integer, primary_key = True)
    firstName = db.Column(db.Text, nullable = False)
    lastName = db.Column(db.Text, nullable = False)
    dob = db.Column(db.Text, nullable = False)
    email = db.Column(db.Text, nullable = False, unique = True)
    password = db.Column(db.Text, nullable = False)
    gender = db.Column(db.Text, nullable = False)
    age = db.Column(db.Text, nullable = False)
    properties = db.Column(db.Text)
    autherized_to = db.Column(db.Text)

    def __init__(self, firstName, lastName, dob, email, password, gender, age, properties, autherized_to):
        self.firstName = firstName
        self.lastName = lastName
        self.dob = dob
        self.email = email
        self.password = password
        self.gender = gender
        self.age = age 
        self.properties = properties
        self.autherized_to = autherized_to

    def get_id(self):
        return self.id_user
class properties(db.Model): 

    id_property = db.Column(db.Integer, primary_key = True)
    street = db.Column(db.Text, nullable = False)
    city = db.Column(db.Text, nullable = False)
    state = db.Column(db.Text, nullable = False)
    zipcode = db.Column(db.Integer, nullable = False)
    description = db.Column(db.Text, nullable = False)
    estimate = db.Column(db.Integer, nullable = False)
    photos = db.Column(db.Text, nullable = False)
    videos = db.Column(db.Text, nullable = False)
    belongs_to = db.Column(db.Integer, db.ForeignKey('users.id_user'), nullable = False)

    users = db.relationship('users', backref = 'user', uselist = False)

    def __init__(self, street, city, state, zipcode, description, estimate, photos, videos, belongs_to):
        self.street = street
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.description = description
        self.estimate = estimate 
        self.photos = photos
        self.videos = videos
        self.belongs_to = belongs_to
class photos(db.Model): 

    id_photo = db.Column(db.Integer, primary_key = True)
    path = db.Column(db.Text, nullable = False)
    belongs_to = db.Column(db.Integer, db.ForeignKey('properties.id_property'), nullable = False)

    properties = db.relationship('properties', backref = 'photo_property', uselist = False)

    def __init__(self, path, belongs_to):
        self.path = path
        self.belongs_to = belongs_to

class videos(db.Model):

    id_video = db.Column(db.Integer, primary_key = True)
    path = db.Column(db.Text, nullable = False)
    belongs_to = db.Column(db.Integer, db.ForeignKey('properties.id_property'), nullable = False)

    properties = db.relationship('properties', backref = 'video_property', uselist = False)

    def __init__(self, path, belongs_to):
        self.path = path
        self.belongs_to = belongs_to

db.create_all()
@app.route("/add_user")
# this is for the sign in page, youll pass the following params and it will add the entry to the database
def add_user(firstname, lastname, dob, email, password, gender, age):
    user = users(firstname, lastname, dob, email, generate_password_hash(password), gender, age, None, None)
    db.session.add(user)
    db.session.commit()
    return "User has been added"

@app.route("/delete_user")
def delete_user(user_id): # on your end if a user wants to delete their account we store the id in the browser session so that is what you will pass to this function
    user = users.query.filter_by(id = user_id).first()
    user.delete()
    db.session.commit()
    return "User has been deleted"

@app.route("/edit_user")
def edit_user(user_id, firstname = None, lastname = None, dob = None, email = None, password = None, gender = None, age = None):
    # This goes down the list of params and if not specified it will not change the attribute
    user = users.query.filter_by(id = user_id).first()
    if firstname != None:
        user.firstName = firstname
    if lastname != None:
        user.lastName = lastname
    if dob != None:
        user.dob = dob
    if email != None:
        user.email = email
    if password != None:
        user.password = generate_password_hash(password)
    if gender != None:
        user.firstName = gender
    if age != None:
        user.firstName = age

    db.session.commit()
    return "user has been updated"

@app.route("/login_user")
def login_user(email, password):
    user = users.query.filter_by(email = email).first() # find user with email they entered
    if user: # if a user is found
        if check_password_hash(user.password, password): # check pass entered vs hashed pass in the database
            return user.id # if password hash matches we will return the user id
        # come back to this
    else:
        return False # if the password does not match return false here
    return False # if no email matches it will return false here

@app.route("/get_user")
# for when you need to display user info this will let you grab it from their user id
def get_user(user_id):
    user = users.query.filter_by(id = user_id).first()
    return user

@app.route("/get_properties")
def get_properties(user_id):
    user = users.query.filter_by(id = user_id).first()
    owned_properties = user.properties()
    for property in owned_properties:
        pass

@app.route("/add_property")
# This is adding a property to the database
def add_property(user_id, street, city, state, zipcode, description, estimate, photos, videos):
    property = properties(street, city, state, zipcode, description, estimate, photos, videos, user_id)
    db.session.add(property)
    user = users.query.filter_by(id = user_id).first()
    if user.properties:
        user.properties = user.properties + ',' + str(property.id)
    else: 
        user.properties = str(property.id)
    db.session.commit()
    return "property has been added"

@app.route("/delete_property")
# we can change this to be like the user routes where we store only the id of the property and there will be a route to get the information (we will talk about that)
def delete_property(property):
    property.delete()
    db.session.commit()
    return "property has been deleted"

@app.route("/edit_property")
def edit_property(property = None, street = None, city = None, state = None, zipcode = None, description = None, estimate = None, photos = None, videos = None):
    # This goes down the list of params and if not specified it will not change the attribute
    if street != None:
        property.street = street
    if city != None:
        property.city = city
    if state != None:
        property.state = state
    if zipcode != None:
        property.zipcode = zipcode
    if description != None:
        property.description = description
    if estimate != None:
        property.estimate = estimate
    if photos != None:
        property.photos = photos
    if videos != None:
        property.videos = videos

    db.session.commit()
    return "property has been updated"

# For all of the video and photo functions

# When you give me a photo I will save it on the 'server' and save the path to the database
# When you request a photo or video I will return the file paths in a list
@app.route("/add_photo")
def add_photo():
    pass

@app.route("/add_video")
def add_video():
    pass

@app.route("/delete_photo")
def delete_photo():
    pass

@app.route("/delete_video")
def delete_video():
    pass

@app.route("/get_photos")
def get_photos():
    pass

@app.route("/add_videos")
def add_videos():
    pass
>>>>>>> 84feab529b8c3d6e58869e9c8d3630df431c6095
