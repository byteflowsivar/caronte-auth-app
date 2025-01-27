FROM node:20.18.1-bullseye  AS base

FROM base AS deps-dev
WORKDIR /app
# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm ci

FROM deps-dev AS build

COPY src ./src
COPY public ./public
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY tsconfig.json ./tsconfig.json
COPY next.config.ts ./next.config.ts
COPY next-env.d.ts ./next-env.d.ts
COPY postcss.config.mjs ./postcss.config.mjs
COPY tailwind.config.ts ./tailwind.config.ts
COPY components.json ./components.json
COPY .prettierrc.json ./.prettierrc.json
COPY .env.development .env

RUN npm run build

FROM node:20.18.1-alpine3.21 AS runner
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

COPY .env.development .env

RUN addgroup -S nodejs \
    && adduser -S nodejs -G nodejs

RUN chown -R nodejs:nodejs /app

USER nodejs

CMD ["node", "server"]