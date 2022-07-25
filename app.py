import os
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
#    os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://wioxagnwhkkuxp:b8c93b7ef1817382194f219c61a128461af1b84b130bb922cf3886d9cb7bf521@ec2-44-206-214-233.compute-1.amazonaws.com:5432/datg9oumt9msnn'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# DATABASE SETUP
db = SQLAlchemy(app)
Migrate(app, db)


class users(db.Model):

    id_user = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.Text, nullable=False)
    lastName = db.Column(db.Text, nullable=False)
    dob = db.Column(db.Text)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    properties = db.Column(db.Text)
    autherized_to = db.Column(db.Text)

    def __init__(self, firstName, lastName, dob, email, password, properties, autherized_to):
        self.firstName = firstName
        self.lastName = lastName
        self.dob = dob
        self.email = email
        self.password = password
        self.properties = properties
        self.autherized_to = autherized_to

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

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
    photos = db.Column(db.Text)
    videos = db.Column(db.Text)
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

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


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

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


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

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


# db.create_all()

@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/hello")
def hello():
    return jsonify({'string': 'Hello World'})


@app.route("/add_user", methods=['POST'])  # TESTED AND WORKING W/ POSTMAN
# this is for the sign in page, youll pass the following params and it will add the entry to the database
def add_user():
    request_json = request.get_json()  # get json data

    # set json data into vars
    firstname = request_json.get('firstname')
    lastname = request_json.get('lastname')
    email = request_json.get('email')
    password = request_json.get('password')

    # add user to database
    user = users(firstname, lastname, None, email,
                 generate_password_hash(password), None, None)
    db.session.add(user)
    db.session.commit()

    # return a successful msg
    return jsonify({"user_id": user.id_user})


@app.route("/delete_user", methods=['POST'])  # TESTED AND WORKING W/ POSTMAN
def delete_user():  # on your end if a user wants to delete their account we store the id in the browser session so that is what you will pass to this function
    request_json = request.get_json()  # get json data

    # set json data into vars
    user_id = request_json.get('user_id')

    users.query.filter_by(id_user=user_id).delete()
    db.session.commit()

    return "User has been deleted"


@app.route("/edit_user", methods=['POST'])  # TESTED AND WORKING W/ POSTMAN
def edit_user():
    request_json = request.get_json()  # get json data

    user_id = request_json.get('user_id')
    user = users.query.filter_by(id_user=user_id).first()

    # this chain of if's checks to see if you sent an attribute to be changed
    # if an attribute doesnt need to be changed you dont have to send it in the json to this api call
    if 'firstname' in request_json:
        firstname = request_json.get('firstname')
        user.firstName = firstname
    if 'lastname' in request_json:
        lastname = request_json.get('lastname')
        user.lastName = lastname
    if 'dob' in request_json:
        dob = request_json.get('dob')
        user.dob = dob
    if 'email' in request_json:
        email = request_json.get('email')
        user.email = email
    if 'password' in request_json:
        password = request_json.get('password')
        user.password = generate_password_hash(password)
    if 'gender' in request_json:
        gender = request_json.get('gender')
        user.firstName = gender
    if 'age' in request_json:
        age = request_json.get('age')
        user.firstName = age

    db.session.commit()

    return "user has been updated"


@app.route("/login_user", methods=['POST'])  # TESTED AND WORKING W/ POSTMAN
def login_user():
    request_json = request.get_json()  # get json data

    email = request_json.get('email')
    password = request_json.get('password')

    # find user with email they entered
    user = users.query.filter_by(email=email).first()
    if user:  # if a user is found
        # check pass entered vs hashed pass in the database
        if check_password_hash(user.password, password):
            # if password hash matches we will return the user id
            return jsonify(user.id_user)
            # will also return a session token (adding later)
        else:
            return False  # if the password does not match return false here
    else:
        return False  # if no email matches it will return false here


@app.route("/get_user", methods=['GET'])  # TESTED AND WORKING W/ POSTMAN
# for when you need to display user info this will let you grab it from their user id
def get_user():
    request_json = request.get_json()  # get json data

    user_id = request_json.get('user_id')
    user = users.query.filter_by(id_user=user_id).first()
    print(user.firstName)
    return jsonify(user.as_dict())


@app.route("/get_properties", methods=['GET'])
def get_properties():
    request_json = request.get_json()  # get json data

    user_id = request_json.get('user_id')
    user = users.query.filter_by(id_user=user_id).first()
    property_list = user.properties().split(',')
    owned_properties = []
    for property_id in property_list:
        property = properties.query.filter_by(
            property_id=int(property_id)).first()
        owned_properties.append(property)
    return jsonify(owned_properties)


@app.route("/add_property", methods=['POST'])  # TESTED AND WORKING W/ POSTMAN
# This is adding a property to the database
def add_property():
    request_json = request.get_json()  # get json data

    user_id = request_json.get('user_id')
    user = users.query.filter_by(id_user=user_id).first()

    street = request_json.get('street')
    city = request_json.get('city')
    state = request_json.get('state')
    zipcode = request_json.get('zipcode')
    description = request_json.get('description')
    estimate = request_json.get('estimate')

    property = properties(street, city, state, zipcode,
                          description, estimate, None, None, user_id)
    db.session.add(property)
    if user.properties:
        user.properties = user.properties + ',' + str(property.id_property)
    else:
        user.properties = str(property.id_property)
    db.session.commit()
    return "property has been added"


@app.route("/delete_property", methods=['POST'])
# we can change this to be like the user routes where we store only the id of the property and there will be a route to get the information (we will talk about that)
def delete_property():
    request_json = request.get_json()  # get json data

    property_id = request_json.get('property_id')
    properties.query.filter_by(id_property=property_id).delete()
    db.session.commit()
    return "property has been deleted"


@app.route("/edit_property", methods=['POST'])
def edit_property():
    request_json = request.get_json()  # get json data
    # This goes down the list of params and if not specified it will not change the attribute

    property_id = request_json.get('property_id')
    property = properties.query.filter_by(id_property=int(property_id)).first()

    if 'street' in request_json:
        street = request_json.get('street')
        property.street = street
    if 'city' in request_json:
        city = request_json.get('city')
        property.city = city
    if 'state' in request_json:
        state = request_json.get('state')
        property.state = state
    if 'zipcode' in request_json:
        zipcode = request_json.get('zipcode')
        property.zipcode = zipcode
    if 'description' in request_json:
        description = request_json.get('description')
        property.description = description
    if 'estimate' in request_json:
        estimate = request_json.get('estimate')
        property.estimate = estimate

    db.session.commit()

    return "property has been updated"

# For all of the video and photo functions

# When you give me a photo I will save it on the 'server' and save the path to the database
# When you request a photo or video I will return the file paths in a list


@app.route("/add_photo", methods=['POST'])
def add_photo():
    pass


@app.route("/add_video", methods=['POST'])
def add_video():
    pass


@app.route("/delete_photo", methods=['POST'])
def delete_photo():
    pass


@app.route("/delete_video", methods=['POST'])
def delete_video():
    pass


@app.route("/get_photos", methods=['GET'])
def get_photos():
    pass


@app.route("/get_videos", methods=['GET'])
def add_videos():
    pass


if __name__ == '__main__':
    app.run(debug=True)
