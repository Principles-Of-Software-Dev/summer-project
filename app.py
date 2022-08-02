import secrets
import os
import uuid
from os.path import dirname, abspath, exists
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, redirect, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import smtplib
import base64
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
#    os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://xyjjclbtrstkos:9a3ac34a9b6868d5722e27d84f00074dcf3ba7464dfd78f6d735c67af8ba38b1@ec2-44-206-197-71.compute-1.amazonaws.com:5432/d9hg8scoriqe2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
upload_dir = os.path.join(dirname(dirname(abspath(__file__))), 'assets')
app.config['UPLOAD_FOLDER'] = upload_dir

admin_emails = ['admin@email.com']

# DATABASE SETUP
db = SQLAlchemy(app)
Migrate(app, db)


class users(db.Model):

    id_user = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.Text, nullable=False)
    lastname = db.Column(db.Text, nullable=False)
    #dob = db.Column(db.Text)
    street = db.Column(db.Text)
    city = db.Column(db.Text)
    state = db.Column(db.Text)
    zipcode = db.Column(db.Integer)
    email = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    manager = db.Column(db.Text)
    setup_complete = db.Column(db.Text)
    session_token = db.Column(db.Text)
    session_token_expr = db.Column(db.Text)
    password = db.Column(db.Text)
    authorized_to = db.Column(db.Text)
    items = db.Column(db.Text)

    def __init__(self, firstname, lastName, street, city, state, zipcode, email, password, manager):
        self.firstname = firstname
        self.lastName = lastName
       # self.dob = dob
        self.street = street
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.email = email
        self.password = password
        self.manager = manager
        self.setup_complete = 'false'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def get_id(self):
        return self.id_user


class items(db.Model):

    id_item = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    estimate = db.Column(db.Integer)
    photos = db.Column(db.Text)
    videos = db.Column(db.Text)
    belongs_to = db.Column(db.Integer, db.ForeignKey(
        'users.id_user'), nullable=False)

    users = db.relationship('users', backref='user', uselist=False)

    def __init__(self, name, description, estimate, photos, videos, belongs_to):
        self.name = name
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
        'items.id_item'), nullable=False)

    properties = db.relationship('items', backref='photo_item', uselist=False)

    def __init__(self, path, belongs_to):
        self.path = path
        self.belongs_to = belongs_to

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class videos(db.Model):

    id_video = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.Text, nullable=False)
    belongs_to = db.Column(db.Integer, db.ForeignKey(
        'items.id_item'), nullable=False)

    properties = db.relationship('items', backref='video_item', uselist=False)

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


@app.route("/setup_account", methods=['POST'])  # tested locally
def setup_account():
    # set json data into vars
    firstname = request.form.get('firstname').lower()
    lastname = request.form.get('lastname').lower()
    email = request.form.get('email').lower()
    manager = request.form.get('manager').lower()

    # validate if email already exist
    if users.query.filter_by(email=email).first():
        # email already exist
        return jsonify(401)

    password = secrets.token_hex(5)
    password = password + 'C!'

    # add user to database
    user = users(firstname, lastname, None, None, None, None,
                 email, generate_password_hash(password), manager)
    db.session.add(user)
    db.session.commit()

    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login('mercer.jonathancode@gmail.com', 'myqjezytyfvfycmy')

        subject = 'Login Details'
        body = 'Your username is ' + email + ' and your password is ' + password
        msg = f'Subject: {subject}\n\n{body}'

        smtp.sendmail('mercer.jonathancode@gmail.com', email, msg)
    # create response object
    return jsonify({'rsp_msg': 'user has been setup'})


@app.route("/edit_user", methods=['POST'])  # tested locally
def edit_user():

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    # see which attributes were included in request and change if specified
    if request.form.get('firstname') or request.form.get('firstname') != '':
        firstname = request.form.get('firstname').lower()
        user.firstname = firstname
    if request.form.get('lastname') or request.form.get('lastname') != '':
        lastname = request.form.get('lastname').lower()
        user.lastName = lastname
    # if request.form.get('dob') or request.form.get('dob') != '':
        #dob = request.form.get('dob')
       # user.dob = dob
    if request.form.get('street') or request.form.get('street') != '':
        street = request.form.get('street')
        user.street = street
    if request.form.get('city') or request.form.get('city') != '':
        city = request.form.get('city')
        user.city = city
    if request.form.get('state') or request.form.get('state') != '':
        state = request.form.get('state')
        user.state = state
    if request.form.get('zipcode') or request.form.get('zipcode') != '':
        zipcode = request.form.get('zipcode')
        user.zipcode = zipcode
    if request.form.get('email') or request.form.get('email') != '':
        email = request.form.get('email').lower()
        # validate if email already exist
        if users.query.filter_by(email=email).first():
            return jsonify(401)
        user.email = email
    if request.form.get('password') or request.form.get('password') != '':
        password = request.form.get('password')
        user.password = generate_password_hash(password)
    if request.form.get('auth_user') or request.form.get('auth_user') != '':
        auth_user = request.form.get('auth_user')
        authorize_user(auth_user, user)

    if user.setup_complete == 'false':
        user.setup_complete = 'true'

    db.session.commit()

    return jsonify({"rsp_msg": "User has been updated"})


@app.route("/login_user", methods=['POST'])  # tested locally
def login_user():

    # set json data into vars
    email = request.form.get('email').lower()
    password = request.form.get('password')

    # query for user
    user = users.query.filter_by(email=email).first()
    # if a user is found
    if user:
        # check pass entered vs hashed pass in the db
        if check_password_hash(user.password, password):

            generate_session_token(user)
            # create response object
            user_dict = user.as_dict()
            del user_dict['session_token']
            del user_dict['session_token_expr']
            del user_dict['password']
            response = jsonify({"user": user_dict})
            response.set_cookie(
                'session_token', user.session_token, httponly=True)
            return response


@app.route("/get_user", methods=['GET'])
def get_user():

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    user_id = request.form.get('user_id')
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


@app.route("/authorize_user", methods=['POST'])  # tested locally
def authorize_user(auth_user_email, user):

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    # query for authorized user in db
    authorized_user = users.query.filter_by(email=auth_user_email).first()
    # if authorized email is your own
    if auth_user_email == user.email:
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

        db.session.commit()
        return jsonify({"rsp_msg": "User has been authorized"})
    else:
        # user does not exist
        return jsonify(402)


@app.route("/add_item", methods=['POST'])  # tested locally
def add_item():

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    # set json data into vars
    user_id = request.form.get('user_id')
    user = users.query.filter_by(id_user=user_id).first()

    # set json data into vars
    name = request.form.get('name')
    description = request.form.get('description')
    estimate = request.form.get('estimate')
    photos = request.files.getlist("photos")
    videos = request.files.getlist("videos")

    photo_array = []
    for photo in photos:
        my_string = str(base64.b64encode(photo.read()))[2:-1]
        photo_array.append((my_string))

    video_array = []
    for video in videos:
        my_string = str(base64.b64encode(video.read()))[2:-1]
        video_array.append(str(my_string))

    # enter property in db
    item = items(name, description, estimate, str(photo_array)[
                 2:-2].replace("'", ""), str(video_array)[2:-2].replace("'", ""), user.id_user)
    db.session.add(item)
    db.session.commit()

    # add property to user
    if user.items:
        user.items = user.items + ',' + str(item.id_item)
    else:
        user.items = str(item.id_item)
    db.session.commit()

    return jsonify({"rsp_msg": "item has been added"})


@app.route("/edit_item", methods=['POST'])
def edit_item():

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    # set json data into vars
    item_id = request.form.get('item_id')
    item = items.query.filter_by(id_item=item_id).first()

    if request.form.get('name') or request.form.get('name') != '':
        name = request.form.get('name')
        item.name = name
    if request.form.get('description') or request.form.get('description') != '':
        description = request.form.get('description')
        item.description = description
    if request.form.get('estimate') or request.form.get('estimate') != '':
        estimate = request.form.get('estimate')
        item.estimate = estimate
    if request.files.getlist("photos"):
        photos = request.files.getlist("photos")
        photo_array = []
        for photo in photos:
            my_string = str(base64.b64encode(photo.read()))[
                2:-1].replace("'", "")
            photo_array.append(my_string)
            print(my_string)
        item.photos = item.photos + ', ' + \
            str(photo_array)[2:-1].replace("'", "")
    if request.form.get('videos'):
        print('this triggered')
        videos = request.files.getlist("videos")
        print(videos)
        video_array = []
        for video in videos:
            my_string = str(base64.b64encode(photo.read()))[2:-1]
            video_array.append(my_string)
        item.videos = item.videos + ', ' + str(video_array)

    db.session.commit()

    return jsonify({"rsp_msg": "item has been edited"})


@app.route("/delete_item", methods=['POST'])  # tested locally
def delete_item():

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    user_id = int(request.form.get('user_id'))
    user = users.query.filter_by(id_user=user_id).first()
    item_id = int(request.form.get('item_id'))
    items.query.filter_by(id_item=item_id).delete()
    item_ids = user.items.split(',')
    if str(item_id) in item_ids:
        print(item_id)
        item_ids.remove(str(item_id))
    user.items = ','.join(item_ids)

    db.session.commit()

    return jsonify({"rsp_msg": "item has been deleted"})


@app.route("/get_items", methods=['POST'])
def get_items():

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    user_id = request.form.get('user_id')
    user = users.query.filter_by(id_user=user_id).first()
    item_ids = user.items.split(',')
    items_list = []
    for item_id in item_ids:
        item = items.query.filter_by(id_item=int(item_id)).first()
        items_list.append(item.as_dict())

    return jsonify({"items": items_list})


@app.route("/get_items_download", methods=['POST'])
def get_items_downloads():

    # grab access token
    session_token = request.cookies.get('session_token')
    # was access token passed?
    if session_token:
        # set json data into vars
        user_id = request.form.get('user_id')
        user = users.query.filter_by(id_user=user_id).first()
        # is the token valid?
        if not is_token_valid(session_token, user_id):
            return jsonify(409)
    else:
        return jsonify(409)

    user_id = request.form.get('user_id')
    user = users.query.filter_by(id_user=user_id).first()
    item_ids = user.items.split(',')
    items_list = []
    for item_id in item_ids:
        item = items.query.filter_by(id_item=int(item_id)).first()
        item_dict = item.as_dict()
        del item_dict['photos']
        del item_dict['videos']
        del item_dict['belongs_to']
        del item_dict['id_item']
        items_list.append(item_dict)

    return jsonify(pprint.pformat(items_list)[2:-2])


def generate_session_token(user):
    token = secrets.token_hex(32)
    token_expr = int((datetime.now() + timedelta(days=2)).timestamp())
    user.session_token = token
    user.session_token_expr = token_expr
    db.session.commit()
    return token


def is_token_valid(token, user_id=None):
    user = users.query.filter_by(id_user=user_id).first()
    if user and token == user.session_token:
        token_expr = user.session_token_expr
        if int((datetime.now()).timestamp()) > int(token_expr):
            return False
        else:
            return True
    else:
        return False


if __name__ == '__main__':
    app.run(debug=True)
