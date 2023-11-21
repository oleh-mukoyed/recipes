FROM node:alpine as build

USER node

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node ./packages/server/package*.json ./
COPY --chown=node:node ./packages/server/tsconfig*.json ./
COPY --chown=node:node ./packages/server/src ./src
COPY --chown=node:node ./packages/server/prisma ./prisma

RUN yarn install

ENV NODE_ENV production

RUN yarn install --prod --immutable && yarn cache clean

RUN npx prisma generate

#RUN yarn build
RUN npx @nestjs/cli build

FROM node:alpine As production

WORKDIR /app

ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

CMD yarn start:migrate:prod