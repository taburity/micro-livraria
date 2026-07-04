FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY services/shipping/package*.json ./services/shipping/

RUN npm install

COPY . .

CMD ["node", "services/shipping/index.js"]