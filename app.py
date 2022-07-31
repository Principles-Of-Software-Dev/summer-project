import json
import secrets
import os
from urllib import response
import uuid
from os.path import dirname, abspath, exists
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_from_directory, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
#    os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://kqnjsvtwnpmxgh:150bcbb0f8972d6eef08ca09c52a8b6a8cf05d1e183e8252fd50577de5a49c80@ec2-3-224-8-189.compute-1.amazonaws.com:5432/ddhno9rq3t97r8'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
upload_dir = os.path.join(dirname(dirname(abspath(__file__))), 'assets')
admin_emails = ['admin@email.com']


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
    authorized_to_me = db.Column(db.Text)
    authorized_to = db.Column(db.Text)
    access_token = db.Column(db.Text)
    access_token_expr = db.Column(db.Integer)
    session_token = db.Column(db.Text)
    session_token_expr = db.Column(db.Integer)

    def __init__(self, firstName, lastName, dob, email, password, properties, authorized_to, authorized_to_me, access_token, access_token_expr, session_token, session_token_expr):
        self.firstName = firstName
        self.lastName = lastName
        self.dob = dob
        self.email = email
        self.password = password
        self.properties = properties
        self.authorized_to = authorized_to
        self.authorized_to_me = authorized_to_me
        self.access_token = access_token
        self.access_token_expr = access_token_expr
        self.session_token = session_token
        self.session_token_expr = session_token_expr

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


class tickets(db.Model):

    id_ticket = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.Text, nullable=False)
    lastname = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)
    number = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text, nullable=False)
    message = db.Column(db.Text, nullable=False)

    def __init__(self, firstname, lastname, email, number, title, message):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.number = number
        self.title = title
        self.message = message

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


db.create_all()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route("/hello")
def hello():
    return jsonify({'string': 'Hello World'})


@app.route("/add_user", methods=['POST'])  # FINISHED
def add_user():
    request_json = request.get_json()  # get json data

    # set json data into vars
    firstname = request_json.get('firstname').lower()
    lastname = request_json.get('lastname').lower()
    email = request_json.get('email').lower()
    password = request_json.get('password')

    # validate if email already exist
    if users.query.filter_by(email=email).first():
        # email already exist
        return jsonify(401)

    # add user to database
    user = users(firstname, lastname, None, email, generate_password_hash(
        password), None, None, None, None, None, None, None)
    db.session.add(user)
    db.session.commit()

    # generate valid access and session tokens
    token = generate_access_token(user)
    ses_token = generate_session_token(user)

    # create response object
    response = jsonify({"user_id": user.id_user, "access_token": token})
    # add cookie
    response.set_cookie('session_token', ses_token, httponly=True)
    # return the new user's id along with tokens
    return response


@app.route("/delete_user", methods=['POST'])
def delete_user():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # query for user in db
            user = users.query.filter_by(id_user=user_id).first()
            user_property_list = user.properties.split(',')
            for property_id in user_property_list:
                property = properties.query.filter_by(
                    id_property=property_id).first()
                photo_ids = property.photos
                if photo_ids:
                    photo_ids = property.photos.split(',')
                    for photo_id in photo_ids:
                        photo = photos.query.filter_by(
                            id_photo=int(photo_id)).first()
                        os.remove(photo.path)
                        photos.query.filter_by(id_photo=int(photo_id)).delete()
                video_ids = property.videos
                if video_ids:
                    video_ids = property.videos.split(',')
                    for video_id in video_ids:
                        video = videos.query.filter_by(
                            id_video=int(video_id)).first()
                        os.remove(video.path)
                        videos.query.filter_by(id_video=int(video_id)).delete()

                properties.query.filter_by(id_property=property_id).delete()

            # delete user from database
            users.query.filter_by(id_user=user_id).delete()
            db.session.commit()
            return jsonify({"rsp_msg": "User has been deleted"})
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/edit_user", methods=['POST'])  # FINISHED
def edit_user():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # query for user in db
            user = users.query.filter_by(id_user=user_id).first()

            # see which attributes were included in request and change if specified
            if 'firstname' in request_json:
                firstname = request_json.get('firstname').lower()
                user.firstName = firstname
            if 'lastname' in request_json:
                lastname = request_json.get('lastname').lower()
                user.lastName = lastname
            if 'dob' in request_json:
                dob = request_json.get('dob')
                user.dob = dob
            if 'email' in request_json:
                email = request_json.get('email').lower()
                # validate if email already exist
                if users.query.filter_by(email=email).first():
                    return jsonify(401)
                user.email = email
            if 'password' in request_json:
                password = request_json.get('password')
                user.password = generate_password_hash(password)

            db.session.commit()

            return jsonify({"rsp_msg": "User has been updated"})
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/logout_user", methods=['POST'])  # FINISHED
def logout_user():
    request_json = request.get_json()  # get json data
    user_id = request_json.get('user_id')

    user = users.query.filter_by(id_user=user_id).first()  # get user object

    token = generate_access_token(user)  # generate new tokens but don't return
    ses_token = generate_session_token(user)

    reponse = jsonify({'status': 'successful'})

    response.set_cookie('session_token', None)

    return response


@app.route("/session_active", methods=['POST'])  # FINISHED
def session_active():
    # get session token from cookie
    session_token = request.cookies.get('session_token')
    # find if user has session token
    if users.query.filter_by(session_token=session_token):
        # query for user with session token
        user = users.query.filter_by(session_token=session_token).first()
        # is their token valid
        if is_token_valid(session_token, 'session'):
            # generate new access token
            token = generate_access_token(user)
            return jsonify({"user_id": user.id_user, "access_token": token})
        else:
            # session token is invalid
            return jsonify(408)
    else:
        # no user with token was found
        return jsonify(408)


@app.route("/refresh_access_token", methods=['POST'])  # FINISHED
def refresh_access_token():
    request_json = request.get_json()  # get json data

    # set json data into vars
    user_id = request_json.get('user_id')
    # get session token from cookie
    session_token = request.cookies.get('session_token')

    # query for user
    user = users.query.filter_by(id_user=user_id).first()
    # if session token belongs to user and is valid
    if user.session_token == session_token and is_token_valid(user.session_token, 'session'):
        # generate new access token
        access_token = generate_access_token(user)
        return jsonify({"access_token": access_token})
    else:
        # session token is invalid
        return jsonify(408)


@app.route("/login_user", methods=['POST'])  # FINISHED
def login_user():
    request_json = request.get_json()  # get json data

    # set json data into vars
    email = request_json.get('email').lower()
    password = request_json.get('password')

    # query for user
    user = users.query.filter_by(email=email).first()
    # if a user is found
    if user:
        # check pass entered vs hashed pass in the db
        if check_password_hash(user.password, password):
            # generate access and session token
            token = generate_access_token(user)
            ses_token = generate_session_token(user)

            # create response object
            response = jsonify(
                {"user_id": user.id_user, "access_token": token})
            # add cookie
            response.set_cookie('session_token', ses_token, httponly=True)
            # return the new user's id along with tokens
            return response
        else:
            # password does not match
            return jsonify(403)
    else:
        # email does not exist
        return jsonify(402)


@app.route("/get_user", methods=['POST'])
def get_user():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # query for user in db
            user = users.query.filter_by(id_user=user_id).first()
            if user:
                user_as_dict = user.as_dict()
                del user_as_dict['session_token']
                del user_as_dict['session_token_expr']
                del user_as_dict['access_token']
                del user_as_dict['access_token_expr']
                del user_as_dict['password']
                return jsonify({"user": user_as_dict})
            else:
                # user does not exist
                return jsonify(402)

        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/authorize_user", methods=['POST'])
def authorize_user():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # set json data into vars
            email_of_authorized = request_json.get('email_of_authorized')
            # query for user in db
            user = users.query.filter_by(id_user=user_id).first()
            # query for authorized user in db
            authorized_user = users.query.filter_by(
                email=email_of_authorized).first()
            # if authorized email is your own
            if email_of_authorized == user.email:
                # cant authorize yourself
                return jsonify(406)
            # if authorized user exist
            elif authorized_user:
                if authorized_user.authorized_to:
                    # if authorized user is already authorized
                    if str(user.id_user) in authorized_user.authorized_to.split(','):
                        # user already authorized
                        return jsonify(405)
                    else:
                        # append user to authorized_to list
                        authorized_user.authorized_to = authorized_user.authorized_to + \
                            ',' + str(user.id_user)
                else:
                    # add user to authorized_to list
                    authorized_user.authorized_to = str(user.id_user)

                if user.authorized_to_me:
                    if str(authorized_user.id_user) in user.authorized_to_me.split(','):
                        # user already authorized
                        return jsonify(405)
                    else:
                        # append user to authorized_to_me list
                        user.authorized_to_me = user.authorized_to_me + \
                            ',' + str(authorized_user.id_user)
                else:
                    # add user to authorized_to_me list
                    user.authorized_to_me = str(authorized_user.id_user)

                db.session.commit()
                return jsonify({"rsp_msg": "User has been authorized"})
            else:
                # user does not exist
                return jsonify(402)
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/deauthorize_user", methods=['POST'])
def deauthorize_user():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # set json data into vars
            email_of_authorized = request_json.get('email_of_authorized')

            # query for user in db
            user = users.query.filter_by(id_user=user_id).first()
            # query for authorized user in db
            authorized_user = users.query.filter_by(
                email=email_of_authorized).first()
            # if authorized user exist
            if authorized_user:

                authorized_to_list = authorized_user.authorized_to.split(',')
                # is authorized user is already deauthorized
                if not str(user.id_user) in authorized_to_list:
                    # user does not exist
                    return jsonify(402)
                else:
                    # remove user to authorized_to list
                    authorized_to_list.remove(str(user.id_user))
                    authorized_user.authorized_to = ','.join(
                        authorized_to_list)
                    db.session.commit()

                authorized_to_me_list = user.authorized_to_me.split(',')
                # is authorized user is already deauthorized
                if not str(authorized_user.id_user) in authorized_to_me_list:
                    # user does not exist
                    return jsonify(402)
                else:
                    # remove user to authorized_to list
                    authorized_to_me_list.remove(str(authorized_user.id_user))
                    user.authorized_to_me = ','.join(authorized_to_me_list)
                    db.session.commit()
                    return jsonify({"rsp_msg": "User has been deauthorized"})
            else:
                # user does not exist
                return jsonify(402)
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/add_property", methods=['POST'])  # FINISHED
def add_property():
    # request_json = request.get_json()  # get json data
    print(request.form)

    data = request.form.get('access_token')
    args = request.args.to_dict()
    return jsonify({'accesst': data, 'args': args})
    # grab access token
    access_token = request.form.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # query for user in db
            user = users.query.filter_by(id_user=user_id).first()

            # set json data into vars
            street = request.form.get('street')
            city = request.form.get('city')
            state = request.form.get('state')
            zipcode = request.form.get('zipcode')
            description = request.form.get('description')
            estimate = request.form.get('estimate')
            photos = request.files.getlist("photos")
            videos = request.files.getlist("videos")

            # enter property in db
            property = properties(
                street, city, state, zipcode, description, estimate, None, None, user_id)
            db.session.add(property)
            db.session.commit()

            # add property to user
            if user.properties:
                user.properties = user.properties + \
                    ',' + str(property.id_property)
            else:
                user.properties = str(property.id_property)
            db.session.commit()

            if photos or videos:
                add_media(access_token=access_token, user_id=user_id, upld_photos=photos,
                          upld_videos=videos, property_id=property.id_property)
                # return redirect(url_for('add_media', access_token=access_token, user_id=user_id, upld_photos=photos, upld_videos=videos, property_id=property.id_property))
            return jsonify({"rsp_msg": "property has been added"})
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(419)


@app.route("/get_properties", methods=['POST'])  # FINISHED
def get_properties():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # query for authorized user in db
            user = users.query.filter_by(id_user=user_id).first()
            # split string of property ids
            if user.properties != None:
                property_list = user.properties.split(',')
                return jsonify({'test': property_list})
                owned_properties = []
                if user.properties:
                    # append a list of properties as a dict
                    for property_id in property_list:
                        # query for property
                        property = properties.query.filter_by(
                            id_property=int(property_id)).first()
                        # add to list
                        property_dict = property.as_dict()
                        photo_ids = property_dict.get('photos')
                        if photo_ids:
                            photo_ids = photo_ids.split(',')
                            path_list = []
                            for photo_id in photo_ids:
                                photo = photos.query.filter_by(
                                    id_photo=int(photo_id)).first()
                                path_list.append(photo.path)
                            property_dict['photos'] = path_list

                        video_ids = property_dict.get('videos')
                        if video_ids:
                            video_ids = video_ids.split(',')
                            path_list = []
                            for video_id in video_ids:
                                video = videos.query.filter_by(
                                    id_video=int(video_id)).first()
                                path_list.append(video.path)
                            property_dict['videos'] = path_list
                        owned_properties.append(property_dict)

                authorized_properties = []
                # if user is authorized to another user
                if user.authorized_to:
                    # split string of user ids that you're authorized to
                    authorized_to = user.authorized_to.split(',')
                    for auth_user_id in authorized_to:
                        auth_user = users.query.filter_by(
                            id_user=auth_user_id).first()
                        property_list = auth_user.properties.split(',')
                        if property_list != None:
                            # append list of properties as a dict
                            for property_id in property_list:
                                # query for property
                                property = properties.query.filter_by(
                                    id_property=int(property_id)).first()
                                # add to list
                                property_dict = property.as_dict()
                                photo_ids = property_dict.get('photos')
                                if photo_ids:
                                    photo_ids = photo_ids.split(',')
                                    path_list = []
                                    for photo_id in photo_ids:
                                        photo = photos.query.filter_by(
                                            id_photo=int(photo_id)).first()
                                        path_list.append(photo.path)
                                    property_dict['photos'] = path_list

                                video_ids = property_dict.get('videos')
                                if video_ids:
                                    video_ids = video_ids.split(',')
                                    path_list = []
                                    for video_id in video_ids:
                                        video = videos.query.filter_by(
                                            id_video=int(video_id)).first()
                                        path_list.append(video.path)
                                    property_dict['videos'] = path_list

                                authorized_properties.append(property_dict)

                return jsonify({"owned_properties": owned_properties, "authorized_properties": authorized_properties})
            else:
                # no properties under user
                return jsonify(411)
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/delete_property", methods=['POST'])  # FINISHED
def delete_property():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # set json data into vars
            property_id = request_json.get('property_id')
            # query for property in db
            property = properties.query.filter_by(
                id_property=property_id).first()
            # if property exist
            if property:
                # query for user in db
                user = users.query.filter_by(
                    id_user=property.belongs_to).first()
                # delete property
                user_properties_list = user.properties.split(',')
                user_properties_list.remove(str(property.id_property))
                user.properties = ','.join(user_properties_list)
                if user.properties == '':
                    user.properties = None

                if(property.photos != None):
                    photo_ids = property.photos.split(',')
                    for photo_id in photo_ids:
                        photo = photos.query.filter_by(
                            id_photo=int(photo_id)).first()
                        os.remove(photo.path)
                        photos.query.filter_by(id_photo=int(photo_id)).delete()
                if(property.videos != None):
                    video_ids = property.videos.split(',')
                    for video_id in video_ids:
                        video = videos.query.filter_by(
                            id_video=int(video_id)).first()
                        os.remove(video.path)
                        videos.query.filter_by(id_video=int(video_id)).delete()

                properties.query.filter_by(id_property=property_id).delete()
                db.session.commit()
                return jsonify({"rsp_msg": "property has been deleted"})
            else:
                # property cant be found
                return jsonify(407)
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(419)


@app.route("/edit_property", methods=['POST'])  # FINISHED
def edit_property():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # set json data into vars
            property_id = request_json.get('property_id')
            # query for property in db
            property = properties.query.filter_by(
                id_property=int(property_id)).first()

            # see which attributes were included in request and change if specified
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

            return jsonify({'rsp_mg': "property has been updated"})
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/add_media", methods=['POST'])  # FINISHED
def add_media(access_token, user_id, upld_photos, upld_videos, property_id):

    # grab access token
    #access_token = request.form.get('access_token')
    # if access token exist
    if access_token:
        # set form data into vars
        #user_id = request.form.get('user_id')
        # if access token
        if is_token_valid(access_token, "access", user_id):
            # grab files uploaded
            #upld_photos = request.files.getlist("photos")
            #upld_videos = request.files.getlist("videos")

            # set json data into vars
            #property_id = request.form.get('property_id')
            # query for property in db
            property = properties.query.filter_by(
                id_property=property_id).first()

            # save file and update path
            for file in upld_photos:
                path = os.path.join(upload_dir, str(
                    uuid.uuid4()) + '-' + file.filename)
                file.save(path)
                photo = photos(path, property.id_property)
                db.session.add(photo)
                db.session.commit()

                if property.photos:
                    property.photos = property.photos + \
                        ',' + str(photo.id_photo)
                else:
                    property.photos = str(photo.id_photo)
                db.session.commit()

            for file in upld_videos:
                path = os.path.join(upload_dir, str(
                    uuid.uuid4()) + '-' + file.filename)
                file.save(path)
                video = videos(path, property.id_property)
                db.session.add(video)
                db.session.commit()

                if property.videos:
                    property.videos = property.photos + \
                        ',' + str(video.id_video)
                else:
                    property.videos = str(video.id_video)
                db.session.commit()
        else:
            # token not valid
            return jsonify(409)
    else:
        return jsonify(409)


@app.route("/add_photo", methods=['POST'])  # FINISHED
def add_photo():

    # grab access token
    access_token = request.form.get('access_token')
    # if access token exist
    if access_token:
        # set form data into vars
        user_id = request.form.get('user_id')
        # if access token
        if is_token_valid(access_token, "access", user_id):
            # grab files uploaded
            files = request.files.getlist("photos")

            # set json data into vars
            property_id = request.form.get('property_id')
            # query for property in db
            property = properties.query.filter_by(
                id_property=property_id).first()

            # save file and update path
            for file in files:
                path = os.path.join(upload_dir, str(
                    uuid.uuid4()) + '-' + file.filename)
                file.save(path)
                photo = photos(path, property.id_property)
                db.session.add(photo)
                db.session.commit()

                if property.photos:
                    property.photos = property.photos + \
                        ',' + str(photo.id_photo)
                else:
                    property.photos = str(photo.id_photo)
                db.session.commit()

            return jsonify({"rsp_msg": "Image was uploaded"})
        else:
            # token not valid
            return jsonify(409)
    else:
        return jsonify(409)


@app.route("/add_video", methods=['POST'])  # FINISHED
def add_video():

    # grab access token
    access_token = request.form.get('access_token')
    # if access token exist
    if access_token:
        # set form data into vars
        user_id = request.form.get('user_id')
        # if access token
        if is_token_valid(access_token, "access", user_id):
            # grab files uploaded
            files = request.files.getlist("videos")

            # set json data into vars
            property_id = request.form.get('property_id')
            # query for property in db
            property = properties.query.filter_by(
                id_property=property_id).first()

            # save file and update path
            for file in files:
                path = os.path.join(upload_dir, str(
                    uuid.uuid4()) + '-' + file.filename)
                file.save(path)
                video = videos(path, property.id_property)
                db.session.add(video)
                db.session.commit()

                if property.videos:
                    property.videos = property.photos + \
                        ',' + str(video.id_video)
                else:
                    property.videos = str(video.id_video)
                db.session.commit()

            return jsonify({"rsp_msg": "Video was uploaded"})
        else:
            # token not valid
            return jsonify(409)
    else:
        return jsonify(409)


@app.route("/delete_photo", methods=['POST'])  # FINISHED
def delete_photo():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # set json data into vars
            photo_id = request_json.get('photo_id')
            # query for photo in db
            photo = photos.query.filter_by(id_photo=photo_id).first()
            # if photo exist
            if photo:
                # query for propety in db
                property = properties.query.filter_by(
                    id_property=photo.belongs_to).first()
                # delete photo
                property_photo_list = property.photos.split(',')
                property_photo_list.remove(str(photo.id_photo))
                print(property_photo_list)
                print('testing')
                property.photos = ','.join(property_photo_list)
                os.remove(photo.path)
                photos.query.filter_by(id_photo=photo_id).delete()
                db.session.commit()
                return jsonify({"rsp_msg": "Photo has been deleted"})
            else:
                # property cant be found
                return jsonify(407)
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/delete_video", methods=['POST'])  # FINISHED
def delete_video():
    request_json = request.get_json()  # get json data

    # grab access token
    access_token = request_json.get('access_token')
    # was access token passed?
    if access_token:
        # set json data into vars
        user_id = request_json.get('user_id')
        # is the token valid?
        if is_token_valid(access_token, "access", user_id):
            # set json data into vars
            video_id = request_json.get('video_id')
            # query for video in db
            video = videos.query.filter_by(id_video=video_id).first()
            # if video exist
            if video:
                # query for propety in db
                property = properties.query.filter_by(
                    id_property=video.belongs_to).first()
                # delete video
                property_video_list = property.videos.split(',')
                property_video_list.remove(str(video.id_video))
                property.videos = ','.join(property_video_list)
                os.remove(video.path)
                videos.query.filter_by(id_video=video_id).delete()
                db.session.commit()
                return jsonify({"rsp_msg": "Video has been deleted"})
            else:
                # property cant be found
                return jsonify(407)
        else:
            # token not valid
            return jsonify(409)
    else:
        # token was missing
        return jsonify(409)


@app.route("/add_ticket", methods=['POST'])
def add_ticket():
    request_json = request.get_json()  # get json data

    firstname = request_json.get('firstname')
    lastname = request_json.get('lastname')
    email = request_json.get('email')
    number = request_json.get('number')
    title = request_json.get('title')
    message = request_json.get('message')

    ticket = tickets(firstname, lastname, email, number, title, message)
    db.session.add(ticket)
    db.session.commit()

    return jsonify({"rsp_msg": "Ticket was uploaded"})


@app.route("/delete_ticket", methods=['POST'])
def delete_ticket():
    request_json = request.get_json()  # get json data

    ticket_id = request_json.get('ticket_id')
    ticket = tickets.query.filter_by(id_ticket=ticket_id)
    if ticket:
        tickets.query.filter_by(id_ticket=ticket_id).delete()
        return jsonify({"rsp_msg": "Ticket was uploaded"})
    else:
        return jsonify(410)


@app.route("/get_tickets", methods=['POST'])
def get_tickets():
    ticket_list = []
    for ticket in tickets.query.all():
        ticket_list.append(ticket.as_dict())
    return jsonify(ticket_list)


def generate_access_token(user):
    token = secrets.token_hex(32)
    token_expr = int((datetime.now() + timedelta(minutes=15)).timestamp())
    user.access_token = token
    user.access_token_expr = token_expr
    db.session.commit()
    return token


def generate_session_token(user):
    token = secrets.token_hex(32)
    token_expr = int((datetime.now() + timedelta(days=2)).timestamp())
    user.session_token = token
    user.session_token_expr = token_expr
    db.session.commit()
    return token


def is_token_valid(token, type, user_id=None):
    user = users.query.filter_by(id_user=user_id).first()
    if type == "access":
        if user and token == user.access_token:
            token_expr = user.access_token_expr
            if int((datetime.now()).timestamp()) > token_expr:
                return False
            else:
                return True
        else:
            return False
    elif type == "session":
        user = users.query.filter_by(session_token=token).first()
        if user and token == user.session_token:
            token_expr = user.session_token_expr
            if int((datetime.now()).timestamp()) > token_expr:
                return False
            else:
                return True
        else:
            return False


if __name__ == '__main__':
    app.run(debug=True)
