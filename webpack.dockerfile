FROM node:alpine
ENV NODE_PATH="/usr/lib/node_modules"

COPY . /opt/liwords/
WORKDIR /opt/liwords/

EXPOSE 7000

CMD ["yarn", "dev:wds"]
