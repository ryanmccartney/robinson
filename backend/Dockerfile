FROM node:22-alpine

WORKDIR /home/node/app
COPY --chown=node:node . .

USER node

RUN npm ci

CMD [ "sh", "-c", "npm run $NODE_ENV" ]
