# 🍹 Yboost

Yboost est une application mobile de commande de cocktails, conçue pour simplifier la gestion des commandes en temps réel et offrir aux employés une visualisation claire des stocks et des boissons disponibles.
Elle permet une expérience fluide côté client tout en fournissant aux employés les outils nécessaires pour suivre les commandes et gérer l’inventaire.
Le backend repose sur **NestJS** avec **Prisma** pour la gestion de base de données, et le frontend est développé avec **React**.

---

## 🧠 Fonctionnalités principales

- 🔐 Authentification des utilisateurs (clients et employés)
- 🍸 Commande de cocktails via une interface mobile intuitive
- 🧾 Visualisation du stock en temps réel pour les employés
- 📋 Accès à la liste des cocktails disponibles
- 📊 Suivi des commandes en cours et passées

---

## 🛠️ Stack Technique

- **Backend**: [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), Mysql
- **Frontend**: [React]
- **Gestion de versions**: Git + GitHub

---

## 🚀 Lancer le projet

### 📦 Prérequis

- Node.js (>= 18.x)
- Mysql
- Yarn ou npm

---

### ⚙️ Installation du backend

```bash
git https://github.com/harelmarin/Yboost.git
cd backend
npm install
```

Créer un fichier `.env` dans le dossier `backend/` avec les variables du .env.example (à adapter selon votre configuration locale)

````
DATABASE_URL="mysql://root@localhost:3306/Yboost"

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

npm run start:dev
````

### 📱 Installation du frontend

```bash
cd frontend
npm install
npm run start
```

## 📚 Documentation

L'API est documentée avec Swagger et accessible à l'adresse :

```
http://localhost:3000/api
```

## 👥 Auteurs

- Romain : https://github.com/romaingdr
- Yulan : https://github.com/yulannn
- Marin : https://github.com/harelmarin
