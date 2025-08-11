FROM node:18 AS builder

ARG PORT
ENV PORT ${PORT}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public

RUN npm install --omit=dev

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
