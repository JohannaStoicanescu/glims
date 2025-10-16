FROM node:22-alpine

ARG PORT
ENV PORT 3000

WORKDIR /app

# Prevent accidental writes to host node_modules if mounted later
VOLUME ["/app/node_modules"]

# Install pnpm and NestJS CLI globally
RUN npm install -g --ignore-scripts pnpm@10.17.1 @nestjs/cli

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "start:dev"]
