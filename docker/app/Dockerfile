FROM node:20-alpine

WORKDIR /app

COPY package*.json /app

COPY . /app

COPY .env /app

ENV NODE_ENV=production

RUN npm install

RUN npm run postinstall

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
