# Local Development setup

# Env File

1. .env

## Requirements Without Docker

1. nodejs && install postgres
2. Initialize DB: `CREATE DATABASE ${database_name};`
3. file at the root directory of your project .env add postgres connections
4. run command for development: `npm run start:dev`
5. run command for production: `npm run start`

## Requirements With Docker

- Docker
- Docker-compose

## Configure Docker

Linux/MacOS only: By default your user cannot run docker commands without `sudo`. If you want to make your life easier, do the following:

1. Create a `docker` group:
   `sudo groupadd docker`
2. Add your user to the `docker` group:
   `sudo usermod -aG docker $USER`

Your group membership gets updated when you log out and log back in. After next login you can run `docker` commands without `sudo`. If you do not do this or cannot do this for some reason, remember to add `sudo` before any `docker` command.

## Setup Code

Go to the directory `cd `

1. Put `.env` file at the root directory of your project
2. Build the docker images and run the project: `docker-compose up --build`

## Initialize DB

First time only: Initialize DB

1. Login to psql terminal in DB container: `docker exec -it postgresql psql -U postgres`
2. Initialize DB: `CREATE DATABASE ${database_name};`

## How to run

1. After first initialization simply: `docker-compose up`

## API Base URL

http://localhost:3000/api/v1

## API Doc URL

http://localhost:3000/api/v1/docs
