FROM node:22.17.0-alpine AS base

WORKDIR /app

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxt -u 1001

FROM base AS deps

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

FROM base AS build

COPY package*.json ./

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

ENV NODE_ENV=production

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

RUN mkdir -p /app/logs && chown -R nuxt:nodejs /app/logs

COPY --from=build --chown=nuxt:nodejs /app/.nuxt ./.nuxt
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output

COPY --from=deps --chown=nuxt:nodejs /app/node_modules ./node_modules

COPY --chown=nuxt:nodejs package*.json ./
COPY --chown=nuxt:nodejs nuxt.config.ts ./
COPY --chown=nuxt:nodejs public ./public

USER nuxt

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]