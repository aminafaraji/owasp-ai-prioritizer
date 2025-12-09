# predict.py
import joblib
import numpy as np


model = joblib.load("priority_model.pkl")
type_encoder = joblib.load("type_encoder.pkl")
priority_encoder = joblib.load("priority_encoder.pkl")

def predict_priority(vuln_type: str, score: float) -> str:
    try:
        encoded_type = type_encoder.transform([vuln_type])[0]
        features = np.array([[score, encoded_type]])
        predicted_encoded_priority = model.predict(features)[0]
        predicted_priority = priority_encoder.inverse_transform([predicted_encoded_priority])[0]
        return predicted_priority
    except Exception as e:
        return f"Prediction Error: {str(e)}"
