FROM node:18-alpine

ARG PORT
ENV PORT ${PORT}

WORKDIR /app

COPY package*.json ./ 
RUN npm install --ignore-scripts

COPY next-env.d.ts next.config.ts postcss.config.mjs tsconfig.json src/ public/ ./

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

