FROM node:10.13-alpine as base
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
WORKDIR /usr/src/work
COPY ./ /usr/src/work
RUN cd /usr/src/work \
    &&  cnpm install \
    && npm run build
FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=base /usr/src/work/build /usr/share/nginx/html
COPY --from=base /usr/src/work/proxy.conf /etc/nginx/conf.d/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]