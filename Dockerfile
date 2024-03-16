# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install rimraf -g
# RUN npm install -g @nestjs/cli
# COPY tsconfig.build.json .
# # RUN npm install
# RUN npm run build


# FROM node:20

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install rimraf -g

# COPY tsconfig.build.json .

# RUN npm install

# RUN npm run build

# CMD [ "npm", "run", "start:dev" ]



FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
