FROM node:12.18.3

RUN mkdir /project

WORKDIR /project

COPY . .

RUN yarn install

COPY yarn.lock .

EXPOSE 4201

CMD ["yarn", "start"]
