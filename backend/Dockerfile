FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g ts-node-dev
CMD ["ts-node-dev", "--respawn", "src/index.ts"]
