FROM node:16.13-alpine3.15
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]