.PHONY: run init stop logs build tests unit integration


# ============================
# 	Run
# ============================

run:
	npm run dev

# ============================
#       Docker
# ============================


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
