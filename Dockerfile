FROM navikt/node-express:12.2.0-alpine

WORKDIR /app
RUN npm install http-proxy-middleware jsdom promise

COPY build/ build/
COPY server/ server/
COPY start.sh ./

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]