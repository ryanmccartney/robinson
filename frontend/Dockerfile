FROM node:22-alpine

WORKDIR /home/node/app
COPY . .

#Install Dependencies
RUN npm install

#Build
RUN npm run build

CMD [ "sh", "-c", "npm run $NODE_ENV" ]