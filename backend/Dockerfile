FROM node:22-alpine

USER node
WORKDIR /home/node/app
COPY --chown=node:node . .

RUN npm ci

CMD [ "sh", "-c", "npm run $NODE_ENV" ]
