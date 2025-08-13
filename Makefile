# run docker compose with the development configuration
docker-dev:
	docker compose up --build

# run docker compose with the production configuration
docker-prod: 
	docker compose -f docker-compose.prod.yml up --build
