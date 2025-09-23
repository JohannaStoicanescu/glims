FROM node:22-alpine

ARG PORT
ENV PORT ${PORT}

WORKDIR /app

RUN npm install -g --ignore-scripts pnpm@10.17.1 @nestjs/cli

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --ignore-scripts

COPY generated src .env nest-cli.json tsconfig.json ./

EXPOSE ${PORT}

CMD ["pnpm", "start:dev"]
