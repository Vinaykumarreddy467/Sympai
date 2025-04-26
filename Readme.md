# SympAI

SympAI is a Flask-based web application designed to assist users with health-related functionalities such as disease prediction, diet suggestions, quick relief tips, and finding nearby healthcare facilities. It also includes user authentication and profile management.

## Features

- **Disease Prediction**: Predict potential diseases based on symptoms.
- **Diet Suggestions**: Provide dietary recommendations.
- **Quick Relief Tips**: Offer quick remedies for common ailments.
- **Nearby Healthcare Facilities**: Locate hospitals and clinics near the user.
- **User Authentication**: Secure login, registration, and profile management.
- **History Tracking**: View past interactions (placeholder for future implementation).

## Prerequisites

- Python 3.8 or higher
- Flask and related dependencies
- SQLite (default database)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sympai.git
   cd sympai
   ```

2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

5. Run the application:
   ```bash
   python app.py
   ```

6. Access the application in your browser at `http://127.0.0.1:5002`.

## Configuration

- Update the `SECRET_KEY` in `app.py` for production use.
- Modify the `SQLALCHEMY_DATABASE_URI` in `app.py` to use a production database.

## API Endpoints

### Public Endpoints

- `/`: Home page.
- `/diet-suggestion`: Diet suggestions.
- `/quick-relief`: Quick relief tips.
- `/care-near-you`: Find nearby healthcare facilities.

### Authenticated Endpoints

- `/profile`: User profile management.
- `/history`: View user history.

### API Routes

- `/get_hospitals`: Accepts `POST` requests with `lat` and `lon` to fetch nearby hospitals and clinics.
- `/disease-prediction`: Handles disease prediction based on symptoms.

## Project Structure

```
sympai/
├── app.py               # Main application file
├── models.py            # Database models
├── forms.py             # Flask-WTF forms
├── prediction.py        # Disease prediction logic
├── templates/           # HTML templates
│   ├── base.html        # Base layout
│   ├── index.html       # Home page
│   ├── login.html       # Login page
│   ├── register.html    # Registration page
│   ├── profile.html     # User profile page
│   ├── prediction.html  # Disease prediction page
│   ├── diet-suggestion.html # Diet suggestion page
│   ├── quick_relief.html    # Quick relief tips page
│   ├── care_near_you.html   # Nearby healthcare facilities page
├── static/              # Static files (CSS, JS, images)
│   ├── css/             # Stylesheets
|   |   ├── care_near_you.css
|   |   ├── Diet.css
|   |   ├── prediction.css
|   |   ├── quick_relief.css
|   |   ├── style.css
│   ├── js/               # JavaScript files
|   |   ├── Dieat.js
|   |   ├── quick_relif.js
|   |   ├── script.js
│   ├── images/          # Chart images
|   |   ├── bar_chart.png
|   |   ├── oats.jpg
|   |   ├── pie_chart.png
├── disease_health_tips.csv 
├── Training_No_STDs.csv
