from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# SQLite database configuration (file-based)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///scans.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Example model
class ScanResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(256))
    tool = db.Column(db.String(50))
    result = db.Column(db.Text)
    vulnerability_type = db.Column(db.String(50), nullable=True)
    severity = db.Column(db.String(50), nullable=True)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "SQLite with Flask is working!"

if __name__ == '__main__':
    app.run(debug=True)
