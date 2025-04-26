<<<<<<< HEAD
from flask import Flask, render_template, url_for, redirect, request, flash
=======
from flask import Flask, render_template, url_for, redirect, request, flash, jsonify
>>>>>>> a79d98c (sympAI-Project)
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from forms import LoginForm, RegistrationForm
import os
# Import prediction module
import prediction
<<<<<<< HEAD
=======
import requests
from geopy.distance import geodesic
import logging
import time
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
>>>>>>> a79d98c (sympAI-Project)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Change this to a random secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

<<<<<<< HEAD
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

=======
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@login_manager.user_loader
def load_user(user_id):
    # Update this line to use the newer syntax
    return db.session.get(User, int(user_id))
>>>>>>> a79d98c (sympAI-Project)
# Make current_user available to templates even if not logged in
@app.context_processor
def inject_user():
    return dict(current_user=current_user)

<<<<<<< HEAD
=======
# Add is_active_page function to templates
@app.context_processor
def utility_processor():
    def is_active_page(endpoint):
        return 'active' if request.endpoint == endpoint else ''
    return dict(is_active_page=is_active_page)

>>>>>>> a79d98c (sympAI-Project)
# Create database tables
with app.app_context():
    db.create_all()

# Public routes - no login required
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/diet-suggestion')
def diet_suggestion():
    return render_template('diet-suggestion.html')

@app.route('/quick-relief')
def quick_relief():
    return render_template('quick_relief.html')

<<<<<<< HEAD
=======
@app.route('/care-near-you')
def care_near_you():
    return render_template('care_near_you.html')

from forms import ProfileForm  # Make sure this is already imported

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    form = ProfileForm()

    # You can later handle form submission here if needed
    return render_template('profile.html', form=form)


@app.route('/history')
@login_required
def history():
    # For now, just render a simple history page
    return render_template('history.html')

# Hospital finder functionality
def get_hospitals(lat, lon, radius=2000, max_results=50):
    try:
        lat = float(lat)
        lon = float(lon)
        if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            raise ValueError("Invalid latitude or longitude values")
    except (TypeError, ValueError) as e:
        logger.error(f"Invalid coordinates: {e}")
        return []

    overpass_url = "http://overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    (
        node["amenity"="hospital"](around:{radius},{lat},{lon});
        node["amenity"="clinic"](around:{radius},{lat},{lon});
    );
    out;
    """
    
    try:
        logger.info(f"Sending Overpass API request for lat={lat}, lon={lon}, radius={radius}")
        response = requests.post(overpass_url, data={'data': query}, timeout=10)
        if response.status_code != 200:
            logger.error(f"Overpass API error: {response.status_code}")
            return []
        
        data = response.json()
        elements = data.get('elements', [])[:max_results]  # Limit results
        logger.info(f"Overpass API returned {len(elements)} hospitals/clinics")
    except requests.RequestException as e:
        logger.error(f"Overpass API request failed: {e}")
        return []

    hospitals = []
    session = requests.Session()
    retries = Retry(total=7, backoff_factor=2, status_forcelist=[502, 503, 504])
    session.mount('https://', HTTPAdapter(max_retries=retries))
    
    for element in elements:
        h_lat = element['lat']
        h_lon = element['lon']
        name = element['tags'].get('name', 'Unknown Hospital/Clinic')
        nominatim_url = f"https://nominatim.openstreetmap.org/reverse?lat={h_lat}&lon={h_lon}&format=json"
        
        try:
            headers = {'User-Agent': 'SympAI/1.0'}
            logger.info(f"Sending Nominatim request for lat={h_lat}, lon={h_lon}")
            nom_response = session.get(nominatim_url, headers=headers, timeout=20)
            address = nom_response.json().get('display_name', 'Address not found') if nom_response.status_code == 200 else f'Lat: {h_lat}, Lon: {h_lon}'
            logger.info(f"Nominatim returned address: {address}")
            time.sleep(1)  # Be nice to the Nominatim API
        except requests.RequestException as e:
            logger.error(f"Nominatim API request failed: {e}")
            address = f'Lat: {h_lat}, Lon: {h_lon}'
        
        distance = geodesic((lat, lon), (h_lat, h_lon)).km
        hospitals.append({
            'name': name,
            'address': address,
            'distance': distance,
            'lat': h_lat,
            'lon': h_lon
        })
    
    hospitals.sort(key=lambda x: x['distance'])
    logger.info(f"Returning {len(hospitals)} hospitals/clinics")
    return hospitals

@app.route('/get_hospitals', methods=['POST'])
def get_hospitals_route():
    try:
        data = request.json
        if not data or 'lat' not in data or 'lon' not in data:
            logger.error("Missing latitude or longitude in request")
            return jsonify({'error': 'Missing latitude or longitude'}), 400
        
        lat = data['lat']
        lon = data['lon']
        logger.info(f"Received request for hospitals at lat={lat}, lon={lon}")
        
        hospitals = get_hospitals(lat, lon)
        return jsonify(hospitals)
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({'error': 'Failed to process request'}), 500

>>>>>>> a79d98c (sympAI-Project)
# Add prediction route
@app.route('/disease-prediction', methods=['GET', 'POST'])
def disease_prediction():
    symptom_choices = prediction.get_symptom_choices()
    if request.method == 'POST':
        patient_name = request.form['patient_name']
        symptoms = [request.form[f'symptom{i}'] for i in range(1, 6)]
        pred_summary, message, success = prediction.get_predictions(patient_name, symptoms)
        if success:
            return render_template('prediction.html', symptom_choices=symptom_choices, 
                                  diagnosis=pred_summary, tips=message, show_charts=True)
        return render_template('prediction.html', symptom_choices=symptom_choices, error=pred_summary)
    return render_template('prediction.html', symptom_choices=symptom_choices)

# Authentication routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('index'))
        else:
            flash('Login unsuccessful. Please check username and password', 'error')
    
    return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You can now log in', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
<<<<<<< HEAD
    app.run(debug=True)
=======
    app.run(debug=True,port=5002)  # Change port to 5001
# Add these routes after your existing routes
>>>>>>> a79d98c (sympAI-Project)
