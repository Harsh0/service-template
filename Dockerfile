FROM node:14.17.0-alpine
WORKDIR /usr/app
RUN npm install -g pm2
COPY package*.json ./
RUN npm install
COPY . .
RUN npm cache verify
RUN npm run build

# Remove Code Source
RUN rm -rf ./src ./public package*.json ts*.json nodemon.json

WORKDIR /usr/app/dist
COPY package*.json ./
COPY public ./public
# nodemon.json added to avoid error (var folder might exist or not)
COPY nodemon.json var* ./var/
RUN rm -rf ./var/nodemon.json
RUN npm install --only=production
# Remove later to improve build time
RUN rm -rf ../node_modules
CMD [ "npm", "run", "start:pm2"]