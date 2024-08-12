<h1 align="center">
    Robinson
</h1>

<p align="center">
  <i align="center">Self-hosted management of the books in your personal library</i>
</p>

<h4 align="center">
 <a href="https://github.com/ryanmccartney/robinson/actions/workflows/backend.yml">
    <img src="https://github.com/ryanmccartney/robinson/actions/workflows/backend.yml/badge.svg" alt="continuous integration">
  </a>

  <a href="https://github.com/ryanmccartney/robinson/actions/workflows/frontend.yml">
    <img src="https://github.com/ryanmccartney/robinson/actions/workflows/frontend.yml/badge.svg" alt="continuous integration">
  </a>

  <a href="https://github.com/ryanmccartney/robinson/graphs/contributors">
    <img src="https://img.shields.io/github/contributors-anon/ryanmccartney/robinson?color=yellow&style=plastic" alt="contributors">
  </a>
  <a href="https://opensource.org/license/gpl-3-0">
    <img src="https://img.shields.io/badge/GNU%20GPL%20v3.0-blue.svg?style=plastic&label=license" alt="license">
  </a>
</h4>

_Work in Progress_

Self-hosted Book management for your personal library.

Add your bookcases, shelves and books. Track where they're stored, who they're loaned to and where you are.

Check your reading timeline and search your library. Easily add book by scanning they're ISBN.

# Development

-   `git clone https://github.com/ryanmccartney/robinson`
-   `cd ./backend && npm i`
-   `cd ./frontend && npm i`
-   `docker compose up -d`

Find the development frontend on `http://localhost:3000` and self-documenting API backend at `http://localhost:3100/api`

# Technology

-   React fronted rolled with Webpack.
-   Node.js Express Backend
-   Docker-based for easy self-hosting

# Installation

```yml
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
        ports:
            - 27017:27017
    backend:
        image: ghcr.io/ryanmccartney/robinson-backend:latest
        restart: unless-stopped
        environment:
            PORT: 3202
            NODE_ENV: production
        depends_on:
            - mongo
        ports:
            - 3100:3100
    frontend:
        image: ghcr.io/ryanmccartney/robinson-frontend:latest
        restart: unless-stopped
        environment:
            PORT: 3202
            NODE_ENV: production
        depends_on:
            - backend
        ports:
            - 3000:3000
volumes:
    robinson-data:
```
