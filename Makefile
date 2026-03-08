# run docker compose with the development configuration
docker-dev:
	docker compose up --build

# run docker compose with the production configuration
docker-prod: 
	docker compose -f docker-compose.prod.yml up --build

migrate-dev:
	docker compose run --rm back pnpm prisma migrate dev

# The migration uses another container that is detroyed as soon as the migration is over
migrate-prod:
	docker compose -f docker-compose.prod.yml run --rm migrate

seed:
	docker compose run --rm back pnpm ts-node prisma/seed.ts
