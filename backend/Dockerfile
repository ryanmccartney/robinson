FROM node:22-alpine

WORKDIR /home/node/app
COPY . .

RUN npm install

CMD [ "sh", "-c", "npm run $NODE_ENV" ]