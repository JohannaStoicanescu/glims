FROM node:22-alpine

USER nonroot

ARG PORT
ENV PORT ${PORT}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN npm add -g @nestjs/cli

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --ignore-scripts

COPY generated src .env nest-cli.json tsconfig.json ./

EXPOSE ${PORT}

CMD ["pnpm", "start:dev"]
