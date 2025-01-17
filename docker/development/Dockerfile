FROM node:20.18.1-bullseye  AS base

FROM base AS deps-dev
WORKDIR /app
# Instalar dependencias con el administrador de paquetes de su preferencia.
COPY package.json package-lock.json ./
RUN npm install

FROM deps-dev AS build
COPY . .
COPY .env.development .env
RUN npm run build

FROM node:20.18.1-alpine3.21 as deps-prod
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20.18.1-alpine3.21 as runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY package.json package-lock.json ./
COPY .env.development .env

CMD ["npm", "run", "start"]