FROM node:20-alpine AS base

ARG PORT
ENV PORT ${PORT}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:20-alpine AS production

# RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY package.json ./

EXPOSE ${PORT}

CMD ["node", "dist/main"]
