FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN tsc

EXPOSE 8000

CMD ["node", "start"]
