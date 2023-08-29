FROM node:latest

WORKDIR /app/node/booksAPI

COPY  ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .

ENTRYPOINT [ "npm", "start" ]

EXPOSE 8000