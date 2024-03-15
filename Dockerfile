FROM node:20

WORKDIR /usr/srs/app

COPY package*.json ./

RUN npm run build

COPY . /imagefolder

WORKDIR  /imagefolder



CMD [ "npm", "run", "start:dev" ]
