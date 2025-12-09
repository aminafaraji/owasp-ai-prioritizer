# AI-Powered Security Vulnerability Scanner

🔍 **Scanner de Vulnérabilités Sécuritaires avec IA | Classificateur OWASP Top 10 | Intégration Multi-Outil**

## 🧠 **Les Étapes**

1. Choisir l'approche ML (supervisé vs non-supervisé)
2. Créer le modèle Random Forest
3. Développer l'API Flask
4. Intégrer l'API dans l'application

### **Étape 1 : Choix de l'Approche Machine Learning**

Pour classifier et prioriser les failles de sécurité selon l'OWASP Top 10, nous avons opté pour :

#### **Apprentissage Supervisé (✓ Choix Retenu)**
- **Pourquoi ?** Nous avons des données étiquetées (vulnérabilités avec catégories OWASP connues)
- **Objectif :** Classification multi-classe (10 catégories OWASP) et régression (score de sévérité)
- **Avantages :** Précision élevée, interprétabilité, adapté à la classification de vulnérabilités

#### **Algorithme Choisi : Random Forest (Forêt Aléatoire)**
- **Type :** Supervised Random Forest
- **Pourquoi Random Forest ?**
  - Gère bien les données multi-dimensionnelles
  - Résistant au surapprentissage (overfitting)
  - Fournit des scores d'importance des caractéristiques
  - Supporte classification ET régression
- **Non retenu :** Apprentissage Non Supervisé
  - Inadapté car nécessite du clustering/détection d'anomalies
  - Nous avons besoin de classification précise, pas de regroupement

### **Étape 2 : Création du Modèle Random Forest**

#### **2.1 Préparation des Données**
   -fichier v_data.csv (Il convient de noter que la quantité de données disponible n’est pas suffisante pour entraîner correctement un modèle, c'est juste un exemple simple.)

#### **2.2 Entraînement du Modèle**


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



#### **2.3 Priorisation des Vulnérabilités**


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



#### **2.4 Création de l'API Flask**


@app.route('/api/test-priority', methods=['POST'])
def test_priority():
    data = request.get_json()
    text = data.get("description", "")
    if not text:
        return jsonify({"error": "Missing vulnerability description"}), 400

    try:
        priority = predict_priority(text)
        return jsonify({"priority": priority})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



### **Étape 1 : L'intégration d'API dans le site web avec React**


const handlePredict = async () => {
    if (!score || !type) {
      alert("Please enter a vulnerability description");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict_priority", {
        type: type,
        score: score,
      });
      setPrediction(res.data.priority);
    } catch (err) {
      console.error("Prediction error:", err.response?.data || err.message);
      setPrediction("Error");
    }
  };


<img width="949" height="482" alt="dashboard" src="https://github.com/user-attachments/assets/66204914-36b5-4e67-bcca-6e8c84e0be77" />
<img width="939" height="478" alt="Capture d’écran 2025-09-15 193326" src="https://github.com/user-attachments/assets/16df630f-a209-4b8f-b5e3-598239e23bbc" />

<img width="956" height="487" alt="Capture d’écran 2025-09-15 193408" src="https://github.com/user-attachments/assets/4e075130-1708-41ef-9913-50f4631c6343" />
<img width="956" height="496" alt="login" src="https://github.com/user-attachments/assets/d11f042f-6a7f-4199-b228-5a518dfbd895" />

<img width="949" height="487" alt="scan1" src="https://github.com/user-attachm<img width="960" height="488" alt="scan2" src="https://github.com/user-attachments/assets/41de0f3a-78bb-4973-9f69-582afaed9e36" />
ents/assets/5d2b6e85-4681-420f-a809-81bb694c1792" />
<img width="949" height="484" alt="scan3" src="https://github.com/user-attachments/assets/b717a0ec-731d-4fee-9315-5ce7044450ac" />










 
