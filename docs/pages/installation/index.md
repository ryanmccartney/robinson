---
layout: page
title: Installation
nav_order: 1
has_children: false
---

# Installation

If you're ready to self-host robinson yourself here's some steps to get started;

Install the docker engine on your OS of choice.

Create a `docker-compose.yml` file on your OS.

Copy the following in it.

```bash
services:
    mongo:
        image: mongo:latest
        restart: unless-stopped
        environment:
            MONGO_INITDB_ROOT_USERNAME: robinson
            MONGO_INITDB_ROOT_PASSWORD: robinson123
            MONGO_INITDB_DATABASE: robinson
        volumes:
            - robinson-data:/data/db
    robinson:
        image: ghcr.io/ryanmccartney/robinson:latest
        restart: unless-stopped
        environment:
            PORT: 80
            NODE_ENV: production
            DB_NAME: robinson
            DB_USER: robinson
            DB_PASSWORD: robinson123
            SESSION_SECRET: pleaseChangeMe
        depends_on:
            - mongo
        ports:
            - 80:80
volumes:
    robinson-data:
```

Please change your `DB_PASSWORD` and `SESSION_SECRET` for your own instance. 

You might want to use the `PROXY_ADDRESS` environment variable if you're hosting behind a proxy.

Run `docker compose up -d`. 

Access robinson at `http://localhost:80`

Login with the default username `admin` and password `robinson123`