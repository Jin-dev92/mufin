# 베이스 이미지
FROM node:20 as builder

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .
#CMD ["npm", "run", "build"]
CMD ["yarn", "build"]
#CMD ["yarn", "start:prod"]
EXPOSE 4000

FROM nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html