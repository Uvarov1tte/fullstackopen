FROM node:lts-jod

WORKDIR /usr/src/app

COPY . .

ENV MONGO_URL="mongodb://the_username:the_password@localhost:3456/the_database"
ENV REDIS_URL="redis://localhost:6379"

RUN npm install

CMD ["npm","run","dev"]