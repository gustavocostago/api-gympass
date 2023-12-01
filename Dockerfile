FROM node:18-alpine

WORKDIR /app
COPY . .

COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build

CMD npx prisma db push && npm start
EXPOSE 25000