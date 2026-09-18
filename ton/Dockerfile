FROM node:alpine

WORKDIR /application

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["yarn", "api"]
