FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# --production --silent && mv node_modules ../
COPY . .

RUN npm install 
WORKDIR /app/frontend

RUN npm install 


WORKDIR /app
# RUN chown -R node /usr/src/app
# USER node
EXPOSE 3000
CMD ["npm", "run", "dev"]
