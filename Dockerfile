# 베이스 이미지
FROM node:20 as builder

WORKDIR /usr/src/app

#COPY package*.json yarn.lock ./

COPY . .

RUN yarn install

#CMD ["yarn", "build"]
RUN yarn build

EXPOSE 4000

RUN yarn start:prod
#FROM nginx
#EXPOSE 4000
##COPY ./nginx/config/nginx.conf /etc/nginx/conf.d/nginx.conf
#COPY --from=builder /usr/src/app/dist /usr/share/nginx/html