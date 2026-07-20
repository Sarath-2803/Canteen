# ---------- Build stage ----------
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---------- Production stage ----------
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/config ./config
COPY --from=builder /usr/src/app/migrations ./migrations
COPY --from=builder /usr/src/app/models ./models
COPY --from=builder /usr/src/app/seeders ./seeders
COPY --from=builder /usr/src/app/.sequelizerc ./.sequelizerc

EXPOSE 5000

CMD ["node", "dist/server.js"]