
#  AI Vulnerability Analyzer  

## 📖 Description  
**AI Vulnerability Analyzer** est une plateforme web intelligente permettant l’**analyse automatisée des vulnérabilités** détectées lors de tests d’intrusion.  
Le projet combine des outils de scan (ZAP, Nmap, Wapiti) avec un modèle d’**Intelligence Artificielle** basé sur **Random Forest**, afin de **classer et prioriser les failles de sécurité selon l’OWASP Top 10**.  

L’objectif est d’offrir aux pentesters et aux équipes de sécurité un **dashboard moderne et intuitif** pour visualiser, comprendre et gérer efficacement les risques.  

---

##  Fonctionnalités principales  
- **Authentification sécurisée** avec gestion de sessions  
- **Dashboard interactif** pour la visualisation des vulnérabilités  
- **Classification OWASP Top 10** automatisée  
- **IA intégrée (Random Forest)** pour prédire et prioriser la gravité des vulnérabilités  
- **Intégration multi-scanners** : ZAP, Nmap, Wapiti  
- **Export des rapports** en CSV/JSON pour exploitation  

---

##  Technologies utilisées  
- **Backend :** Flask (Python)  
- **Frontend :** React  
- **Base de données :** SQLite 
- **IA :** Scikit-learn (Random Forest)  
- **Scanners intégrés :** OWASP ZAP, Nmap, Wapiti  

---
##  Aperçu

###  Page de connexion
![Login Page](images/login.png)

### 📊 Tableau de bord
![Dashboard](images/dashboard.png)

### 🕵️ Historique des scans
![Scan 1](images/scan1.png)
![Scan 2](images/scan2.png)
![Scan 3](images/scan3.png)


---

##  Installation & Utilisation  
1. Clonez le dépôt :  
   ```bash
   git clone https://github.com/12marw/ai-vulnerability-analyzer.git
   cd ai-vulnerability-analyzer
