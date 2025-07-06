.PHONY: run init stop logs build tests unit integration


# ============================
# 	Run
# ============================

run:
	npm run dev

# ============================
#       Docker
# ============================
up:
	@docker compose up

down:
	@docker compose down

down-v:
	@docker compose down -v

build:
	@echo 'Building images ...🛠️'
	@docker compose build

# ============================
# 	Tests
# ============================


# --------------------------
# Init
# --------------------------
init:
	npm install

.update-env-file:
	@echo 'Updating .env from .env.example 🖋️...'
	# Updating .env
	@cp .env.example .env
