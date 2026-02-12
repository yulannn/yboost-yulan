# ===================================
# Étape 1 : Builder - Compilation de l'application
# ===================================
FROM node:20-alpine AS builder

# Installation des dépendances nécessaires pour Prisma et Sharp
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation de TOUTES les dépendances (incluant devDependencies pour le build)
RUN npm ci

# Copie du code source
COPY . .

# Génération du client Prisma
RUN npx prisma generate

# Construction de l'application NestJS
RUN npm run build

# ===================================
# Étape 2 : Production - Image finale légère
# ===================================
FROM node:20-alpine AS production

# Installation des dépendances runtime nécessaires
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copie des fichiers de configuration
COPY package*.json ./
COPY prisma ./prisma/

# Installation UNIQUEMENT des dépendances de production
RUN npm ci --only=production

# Génération du client Prisma dans l'image de production
RUN npx prisma generate

# Copie des fichiers buildés depuis le builder
COPY --from=builder /app/dist ./dist

# Création du dossier uploads pour les fichiers uploadés
RUN mkdir -p /app/uploads && chown -R node:node /app/uploads

# Utilisation de l'utilisateur non-root pour la sécurité
USER node

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/src/main"]
