FROM node:16-alpine
#ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
#RUN npm install --production --silent && mv node_modules ../
RUN npm install
COPY . .
CMD ["node", "src/migrations"]
