FROM node:14.20.0-bullseye-slim

# Create app directory
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# Bundle app source
EXPOSE 3011

CMD [ "npm", "start" ]
