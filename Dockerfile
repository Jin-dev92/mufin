# 베이스 이미지
FROM node:20
WORKDIR /usr/src/app
#COPY package.json yarn.lock ./
COPY ./ ./
RUN yarn
EXPOSE 3000
CMD ["npm","run", "start:dev"]
