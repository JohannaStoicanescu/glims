FROM node:22-alpine

ARG PORT
ENV PORT ${PORT}

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./ 
RUN npm install --ignore-scripts

COPY next-env.d.ts next.config.ts postcss.config.mjs tsconfig.json src/ public/ ./

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

