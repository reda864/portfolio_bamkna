# 🏀 BAAMAKNA 3X3 - Portfolio & CMS

Portfolio officiel et système de gestion de contenu (CMS) pour l'équipe de Basketball 3x3 **BAAMAKNA 3X3** (Meknès, Maroc).

---

## 🛠️ Stack Technique

- **Frontend** : React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Swiper
- **Backend** : Node.js, Express, JWT, Bcrypt
- **Base de Données** : PostgreSQL Serverless sur **Neon** ([neon.tech](https://neon.tech))
- **Hébergement & Déploiement** : **Render** ([render.com](https://render.com))

---

## 🚀 Démarrage Rapide en Local

### 1. Cloner le projet et installer les dépendances
```bash
git clone https://github.com/reda864/portfolio_bamkna.git
cd portfolio_bamkna
npm install
```

### 2. Configurer les variables d'environnement
Créez un fichier `.env` à la racine (voir `.env.example`) :
```env
DATABASE_URL=postgresql://user:password@host/neondb?sslmode=require
JWT_SECRET=votre_cle_secrete_jwt
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
PORT=5000
```

### 3. Lancer en mode développement
```bash
# Lancer le serveur backend
npm run server

# Dans un autre terminal, lancer le frontend Vite
npm run dev
```

---

## 🌐 Déploiement sur Render & Neon

Consultez le guide complet détaillé dans [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

### Résumé des étapes :
1. **Neon** : Créez une base PostgreSQL gratuite sur [neon.tech](https://neon.tech) et copiez la chaîne `DATABASE_URL`.
2. **Render** : Créez un **Web Service** connecté à votre dépôt GitHub.
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm start`
   - **Environment Variables** : Ajoutez `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.
3. Cliquez sur **Deploy** ! L'application compilera le frontend, initialisera automatiquement les tables PostgreSQL et se mettra en ligne.
