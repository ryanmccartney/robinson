FROM node:20-alpine

WORKDIR /home/node/app
COPY . .

#Install Dependencies
RUN npm install

#Build
RUN npm run build

#We don't need the client node_modules folder after building
RUN rm -r ./node_modules
RUN rm -r ./src

CMD [ "sh", "-c", "npm run $NODE_ENV" ]