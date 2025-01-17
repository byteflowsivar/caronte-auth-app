FROM node:20.18.1-bullseye  AS base

FROM base AS deps-dev
WORKDIR /app
# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

FROM deps-dev AS build
COPY . .
COPY .env.staging .env
RUN npm run build

FROM node:20.18.1-alpine3.21 AS runner
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY .env.staging .env

CMD ["node", "server"]