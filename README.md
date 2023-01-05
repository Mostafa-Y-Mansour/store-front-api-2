# store-front-api

## Required Technologies

- PostgreSQL - for the database
- Visual Studio Code - Code Editing
- Postman - API Platform

#### Dependencies

```
    "bcrypt"
    "cors"
    "db-migrate"
    "db-migrate-pg"
    "dotenv"
    "express"
    "jsonwebtoken"
    "pg"
    "supertest"
    "jasmine"
    "jasmine-spec-reporter"
```

#### Dev Dependencies

```
    "@types/bcrypt"
    "@types/cors"
    "@types/express"
    "@types/jasmine"
    "@types/jsonwebtoken"
    "@types/pg"
    "@types/supertest"
    "nodemon"
    "ts-node"
```

## Environmental Variables

- PORT=3000
- POSTGRES_HOST=localhost
- POSTGRES_PORT=5432
- POSTGRES_DB=store_dev
- POSTGRES_DB_TEST=store_test
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
- ENV=dev
- BCRYPT_PASSWORD=mostafa2468
- SALT_ROUNDS=10
- TOKEN_SECRET=mostafa123!

## Database Creation

```
# create user
CREATE USER postgres WITH PASSWORD 'postgres';
# create Database
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
# connect to database
\c store_dev;
```

## Database Migrations

```
# to create all tables
"npm run migrate-up"
# to drop each table separately
"npm run migrate-down"
# to reset the data
"npm run migrate-reset"
# Migrations used in this repo
db-migrate create users--sql-file
db-migrate create products --sql-file
db-migrate create orders --sql-file
db-migrate create order_products --sql-file
```
