FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./dist

EXPOSE 8080

RUN npm run build

CMD [ "node", "start" ]