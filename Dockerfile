FROM node:18 as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18

ENV NODE_ENV production
USER node

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /app/build ./build

EXPOSE 8080
CMD [ "npm", "start" ]