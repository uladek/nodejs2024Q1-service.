

# FROM node:20.11-alpine

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# CMD ["npm", "run", "start:dev"]


# Dockerfile

# Development
FROM node:20.11-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Production
FROM node:20.11-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
