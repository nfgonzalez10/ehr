

FROM node:lts-alpine3.21

WORKDIR /app

COPY package.json .

RUN npm install && npm i -g serve

COPY . .

ARG VITE_API_URL

ENV VITE_API_URL $VITE_API_URL

RUN npm run build

EXPOSE 3001

CMD [ "serve", "-s", "dist", "-p","3001" ]