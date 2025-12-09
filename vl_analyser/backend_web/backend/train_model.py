import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import joblib


df = pd.read_csv("v_data.csv")


le_type = LabelEncoder()
df["type_encoded"] = le_type.fit_transform(df["type"])

le_priority = LabelEncoder()
df["priority_encoded"] = le_priority.fit_transform(df["priority"])

X = df[["score", "type_encoded"]]
y = df["priority_encoded"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
print(classification_report(y_test, model.predict(X_test)))

# Save model and encoders
joblib.dump(model, "priority_model.pkl")
joblib.dump(le_type, "type_encoder.pkl")
joblib.dump(le_priority, "priority_encoder.pkl")

print("✅ Modèle entraîné et sauvegardé avec succès.")
