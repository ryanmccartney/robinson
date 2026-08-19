FROM node:22-alpine

WORKDIR /home/node/app
COPY --chown=node:node . .

USER node

#Install Dependencies
RUN npm ci

#Build
RUN npm run build

CMD [ "sh", "-c", "npm run $NODE_ENV" ]
