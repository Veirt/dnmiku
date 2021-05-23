FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]
