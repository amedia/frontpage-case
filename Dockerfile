ARG NODE_VERSION
FROM node:$NODE_VERSION-alpine

# Replace with your own app name
ENV APPNAME 'template-node-app'

ENV NODE_ENV production

WORKDIR /usr/src/app

USER node
COPY --chown=node:node . .

# Change the port to the app's dedicated port
ENV PORT 8080
EXPOSE $PORT

ENTRYPOINT ["node"]
CMD ["src/server.js"]
