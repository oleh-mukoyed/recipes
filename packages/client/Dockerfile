FROM node:alpine as build

USER node

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node ./packages/client/nginx.conf ./nginx.conf
COPY --chown=node:node ./packages/client/package*.json ./
COPY --chown=node:node ./packages/client/tsconfig*.json ./
COPY --chown=node:node ./packages/client/vite.config.ts ./
COPY --chown=node:node ./packages/client/src ./src
COPY --chown=node:node ./packages/client/index.html ./index.html
COPY --chown=node:node ./packages/client/tailwind.config.js ./
COPY --chown=node:node ./packages/client/postcss.config.js ./
COPY --chown=node:node ./packages/client/.env ./.env

RUN yarn install

ENV NODE_ENV production

RUN yarn install --prod --immutable && yarn cache clean

RUN yarn build

# Stage 2: Production stage with Nginx
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]