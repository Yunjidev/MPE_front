# Utiliser l'image officielle Node.js comme image de base pour la phase de build
FROM node:latest AS build

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du frontend
RUN npm install

# Copier tous les fichiers du frontend dans le répertoire de travail, sauf node_modules et build
COPY . .

# Construire l'application React
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
