<h1 align="center">
    Robinson
</h1>

<p align="center">
  <b align="center">Self-hosted management of the books in your personal library</b>
</p>

<h4 align="center">
 <a href="https://github.com/ryanmccartney/robinson/actions/workflows/release.yml">
    <img src="https://github.com/ryanmccartney/robinson/actions/workflows/release.yml/badge.svg" alt="continuous integration">
  </a>

  <a href="https://github.com/ryanmccartney/robinson/graphs/contributors">
    <img src="https://img.shields.io/github/contributors-anon/ryanmccartney/robinson?color=yellow&style=plastic" alt="contributors">
  </a>
  <a href="https://opensource.org/license/gpl-3-0">
    <img src="https://img.shields.io/badge/GNU%20GPL%20v3.0-blue.svg?style=plastic&label=license" alt="license">
  </a>

  <a href="https://github.com/ryanmccartney/robinson/releases">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/ryanmccartney/robinson?filename=.%2Fbackend%2Fpackage.json&style=plastic">
  </a>

</h4>

Self-hosted Book management for your personal library.

Add your bookcases, shelves and books. Track where they're stored, who they're loaned to and where you are.

Check your reading timeline and search your library. Easily add book by scanning their ISBN.

![](./docs/assets/interface-dark.gif)


# Features

* Organizes books into, shelves and bookcase
* Add books by scanning an ISBN barcode with your phone
* Uses multiple sources to pull book information from ISBN
* Bookmarking, keep your place
* Search across all books
* Favorites, bookmarking and ratings are kept on a per-user basis
* Organize physical books and eBooks
* Built in eBook reader
* Install on your device as a Progressive Web App (PWA)

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

Run `docker compose up -d`. 

Access robinson at `http://localhost:80`

Login with the default username `admin` and password `robinson123`

# Documentation

Read the full docs at [ryan.mccartney.info/robinson](https://ryan.mccartney.info/robinson/)
