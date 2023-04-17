FROM node:19.6.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 5022

CMD ["npm", "run", "start:docker"]
