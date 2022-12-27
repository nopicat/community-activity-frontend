FROM node:16-slim As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:16-slim As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
