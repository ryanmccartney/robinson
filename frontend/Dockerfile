FROM node:22-alpine

USER node
WORKDIR /home/node/app
COPY --chown=node:node . .

#Install Dependencies
RUN npm ci

#Build
RUN npm run build

CMD [ "sh", "-c", "npm run $NODE_ENV" ]
