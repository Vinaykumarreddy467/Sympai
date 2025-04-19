import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend for server-side plotting
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from collections import Counter
import os

# Get the absolute path to the directory containing this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load dataset with absolute path
data_path = os.path.join(BASE_DIR, "Training_No_STDs.csv")
data = pd.read_csv(data_path)
X = data.iloc[:, :-1]  # Features (symptoms)
y = data.iloc[:, -1]   # Target (disease)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define and train models
models = {
    "Decision Tree": DecisionTreeClassifier(),
    "Random Forest": RandomForestClassifier(),
    "Naive Bayes": GaussianNB(),
    "Support Vector Machine": SVC(),
    "K-Nearest Neighbors": KNeighborsClassifier(),
    "Logistic Regression": LogisticRegression(),
}
for clf in models.values():
    clf.fit(X_train, y_train)

# Load health tips with absolute path
def load_health_tips(csv_file):
    try:
        file_path = os.path.join(BASE_DIR, csv_file)
        df = pd.read_csv(file_path)
        return df.groupby("Disease")["Tip1"].apply(list).to_dict()
    except Exception as e:
        print(f"Error loading health tips: {e}")
        return {}
HEALTH_TIPS = load_health_tips("disease_health_tips.csv")

# Chart generation functions
def create_bar_chart(predictions_dict, filename):
    counts = Counter(predictions_dict.values())
    labels, values = zip(*counts.items())
    fig, ax = plt.subplots(figsize=(6, 4))
    bars = ax.bar(labels, values, color=['#66c2a5', '#fc8d62', '#8da0cb'])
    ax.set_ylabel("Number of Models")
    ax.set_title("Prediction Confidence (Bar Chart)")
    ax.set_ylim(0, len(models))
    for bar in bars:
        yval = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2, yval + 0.1, int(yval), ha='center', va='bottom')
    plt.tight_layout()
    fig.savefig(filename)
    plt.close(fig)

def create_pie_chart(predictions_dict, filename):
    counts = Counter(predictions_dict.values())
    labels, sizes = zip(*counts.items())
    colors = ['#66c2a5', '#fc8d62', '#8da0cb']
    fig, ax = plt.subplots(figsize=(4.5, 4.5))
    ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140, colors=colors)
    ax.set_title("Prediction Distribution (Pie Chart)")
    plt.tight_layout()
    fig.savefig(filename)
    plt.close(fig)

# Prediction logic
def get_predictions(patient_name, symptoms):
    if not patient_name.strip():
        return "⚠ Please enter your full name.", "", False
    selected_symptoms = [s for s in symptoms if s != "None"]
    if not selected_symptoms:
        return "⚠ Please select at least one symptom.", "", False

    # Create symptom vector
    vector = [0] * len(X.columns)
    for s in selected_symptoms:
        if s in X.columns:
            vector[X.columns.get_loc(s)] = 1

    # Make predictions
    preds = {model: clf.predict([vector])[0] for model, clf in models.items()}
    diseases = list(set(preds.values()))

    # Format predictions
    pred_summary = "<br>".join([f"<b>🔹 {model}:</b> {disease}" for model, disease in preds.items()])

    # Generate health tips
    tips_out = []
    for d in diseases:
        if d in HEALTH_TIPS:
            tips_out.append(f"🩺 <b>{d}</b><br>" + "<br>".join([f"- {t}" for t in HEALTH_TIPS[d]]))
    tips_block = "<br><br>".join(tips_out) if tips_out else "No specific health tips available."
    message = f"👋 Hello {patient_name}, here are your tailored tips for a healthier, happier you!<br><br>{tips_block}"

    # Generate charts - ensure static/images directory exists
    images_dir = os.path.join(BASE_DIR, 'static', 'images')
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
    
    # Save charts to static/images directory
    bar_chart_path = os.path.join(images_dir, 'bar_chart.png')
    pie_chart_path = os.path.join(images_dir, 'pie_chart.png')
    
    create_bar_chart(preds, bar_chart_path)
    create_pie_chart(preds, pie_chart_path)

    return pred_summary, message, True

# Get symptom choices for the form
def get_symptom_choices():
    return ["None"] + list(X.columns)
