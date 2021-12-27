# Do the npm install or yarn install in the full image
FROM node:12-alpine3.14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]