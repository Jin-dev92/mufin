# 베이스 이미지
FROM node:20 as builder

WORKDIR /usr/src/app

#ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
#RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
#    && ln -s /usr/local/bin/docker-entrypoint.sh /
COPY package*.json yarn.lock ./

RUN yarn install

COPY . .
CMD ["npm", "run", "build"]


FROM nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html