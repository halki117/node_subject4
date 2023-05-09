FROM node:16-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "npm", "run", "start:dev" ]