# This Dockerfile its used for production and a dist folder already builded its expected
FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN yarn install --prod --no-lockfile
COPY ./dist ./dist/
CMD ["node", "./dist/index.js"]