# Adonis API application for The Greatest App for Lottery

## Configuration

This API is configured with the following:

 - Node.
 - Npm or Yarn.
 - Authentication Middleware.
 - E-mail sending.
 - CORS.
 - Pg with Lucid ORM.
 - Validator.

## Database

The database used is a docker image of Postgres SQL. 

To create it run the following in your terminal:

```bash
docker run --name adonis-postgres -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres

    docker exec -it adonis-postgres /bin/bash
    psql postgres postgres -W #"The password is docker"
    create database tgl;
    quit
    exit

adonis migration:run
adonis seed
```

## Running

First create a .env file and copy the env.example, filling the emprty fields.

After run in terminal

```bash
    yarn
    adonis serve --dev
```
