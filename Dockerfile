FROM node:16-alpine

ENV port=3500
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3500
CMD ["node", "./bin/www"]