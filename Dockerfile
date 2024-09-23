FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# --production --silent && mv node_modules ../
COPY . .

RUN npm install 
RUN npm install --prefix /frontend
EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
CMD ["npm", "run", "dev"]
