FROM node:22-alpine

ARG PORT
ENV PORT ${PORT}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN npm add -g @nestjs/cli

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE ${PORT}

CMD ["pnpm", "start:dev"]
