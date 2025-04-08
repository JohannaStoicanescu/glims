# run docker compose with the development configuration
docker-dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# run docker compose with the production configuration
docker-prod: 
	docker compose up --build
