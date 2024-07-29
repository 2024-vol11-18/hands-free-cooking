FROM node:20

WORKDIR /app/

COPY ./cooking_app/*.json ./

RUN npm install

COPY ./cooking_app/ ./

CMD ["npm", "run", "dev"]

