FROM node:16.13-alpine3.15
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i -g ts-node nodemon
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]