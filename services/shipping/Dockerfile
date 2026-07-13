FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY services/shipping/index.js .
COPY proto ./proto

EXPOSE 3001

CMD ["node", "index.js"]
