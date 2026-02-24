FROM node:latest
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005
RUN npm run build
CMD ["node", "server-build.js"]