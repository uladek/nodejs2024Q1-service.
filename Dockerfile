
# Development
FROM node:20.11-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Production
FROM node:20.11-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --only=production
# RUN npm install && nest build

COPY . .

EXPOSE 4000

# CMD ["npm", "run", "start:dev"]

# CMD ["npm", "run", "docker:start"]
# CMD ["npm", "run", "docker:start2"]
# CMD npx prisma migrate deploy && npx prisma generate && npm run start:dev
CMD npx prisma migrate deploy && npx prisma generate && npm run start:dev
