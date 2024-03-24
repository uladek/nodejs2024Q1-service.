
# Development
FROM node:20.11-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

# RUN apk add --no-cache libxml2@2.12.5-r0

RUN npm install

COPY . .

# Production
FROM node:20.11-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
# RUN npm install && nest build

COPY . .

EXPOSE 4000

# CMD ["npm", "run", "start:dev"]

CMD ["npm", "run", "docker:start"]
