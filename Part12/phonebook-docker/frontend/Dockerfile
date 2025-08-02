# The first FROM is now a stage called build-stage

FROM node:lts-jod AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ARG VITE_BACKEND_URL

RUN npm run build


FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80