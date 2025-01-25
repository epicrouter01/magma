FROM node:16-alpine
WORKDIR /usr/src/app
RUN apk update && apk add curl
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
