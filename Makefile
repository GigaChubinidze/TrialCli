test-backend:
	docker compose exec api pytest -v

test-frontend:
	cd frontend && npm test

run:
	docker compose up --build
