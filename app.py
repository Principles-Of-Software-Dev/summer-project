import os
from flask import Flask, render_template, redirect, flash, request, url_for

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import ForeignKey

from flask_login import LoginManager, UserMixin, login_required, login_user, current_user, logout_user
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, SubmitField, PasswordField, SelectField
from wtforms.validators import InputRequired, Length, EqualTo, Email
from werkzeug.security import generate_password_hash, check_password_hash

basedir = os.path.abspath(os.path.dirname(__file__))

# Flask Application Settings
app = Flask(__name__)
app.config['SECRET_KEY'] = 'itsasecret' # This is fine with this being hardcoded for now. We will nees to change this is the future
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Login Manager Setup
login_manager = LoginManager()
login_manager.init_app(app)

# Database Setup
db = SQLAlchemy(app)
Migrate(app, db)

# Database Classes
class users(db.Model, UserMixin):

    id_user = db.Column(db.Integer, primary_key = True)
    firstName = db.Column(db.Text, nullable = False)
    lastName = db.Column(db.Text, nullable = False)
    dob = db.Column(db.Text, nullable = False)
    email = db.Column(db.Text, nullable = False, unique = True)
    password = db.Column(db.Text, nullable = False)
    gender = db.Column(db.Text, nullable = False)
    age = db.Column(db.Text, nullable = False)
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

# WTForms Classes
class formLogin(FlaskForm):
    email = StringField(label='Email', validators=[InputRequired(), Email()])
    password = PasswordField(label='Password', validators=[InputRequired()])
    submit = SubmitField('Login')
class formSignup(FlaskForm):

    firstname = StringField(label='Firstname', validators=[InputRequired()])
    lastname = StringField(label='Lastname', validators=[InputRequired()])
    dob = DateField(label='Date of Birth', validators=[InputRequired()])
    email = StringField(label='Email', validators=[InputRequired(), Email()])
    password = PasswordField(label='Password', validators=[InputRequired(), EqualTo('confirmPassword', message='Passwords much match!')])
    confirmPassword = PasswordField(label='Confirm Password', validators=[InputRequired()])
    gender = SelectField(label='Gender', choices=['Male', 'Female', 'None'], validators=[InputRequired()])
    age = IntegerField(label='Age', validators=[InputRequired()])
    submit = SubmitField('Create Account')
class formAddProperty(FlaskForm):
    pass

@login_manager.user_loader
def load_user(id_user):
    return users.query.get(int(id_user))

# Routes
@app.route('/') # This is the base route where if our domain was 'test' this route is 'test.com'
def base():
    if current_user.is_authenticated:
        return redirect("/dashboard", 302)
    else:
        return redirect("/login", 302)

@app.route('/login', methods=['GET', 'POST'])
def login():
    email = None
    password = None
    form = formLogin()

    if form.validate_on_submit and request.method == 'POST':
        email = form.email.data
        password = form.password.data
        form.email.data = ''
        form.password.data = ''

        user = users.query.filter_by(email = email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user)
                return redirect('/dashboard', 302)
            else:
                flash("We could not find your account. Please try again.", "alert-danger")
                return redirect('/login', 302)
        else:
            flash("We could not find an email for that account. Please try again.", "alert-danger")
            return redirect('/login', 302)

    return render_template('login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    firstname = None
    lastname = None
    dob = None
    email = None
    password = None
    gender = None
    age = None
    form = formSignup()

    if form.validate_on_submit and request.method == 'POST':
        firstname = form.firstname.data
        lastname = form.lastname.data
        dob = form.dob.data
        email = form.email.data
        password = form.password.data
        gender = form.gender.data
        age = form.age.data

        form.firstname.data = ''
        form.lastname.data = ''
        form.dob.data = ''
        form.email.data = ''
        form.password.data = ''
        form.gender.data = ''
        form.age.data = ''

        user = users(firstname, lastname, dob, email, generate_password_hash(password), gender, age, None, None)
        db.session.add(user)
        db.session.commit()
        flash('Account sucessfully created. Feel free to login!', "alert-success")
        return redirect("/login", 302)

    return render_template('signup.html', form=form)

    


if __name__ == '__main__':
    app.run()