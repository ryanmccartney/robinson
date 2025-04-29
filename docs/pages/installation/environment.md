---
layout: page
title: Environment Variables
parent: Installation
nav_order: 1
---

# Environment Variables

| Variable       | Default        | Type    | Description |
|----------------|----------------|---------|-------------|
| PORT           | 80             | Integer | The port opened by express.js inside the container |
| NODE_ENV       | production     | String  | Is it a production of development version of the application |
| DB_NAME        | robinson       | String  | The MongoDB database name |
| DB_USER        | robinson       | String  | The MongoDB username |
| DB_PASSWORD    | robinson123    | String  | The MongoDB password |
| DB_HOST        | mongo          | String  | The MongoDB host |
| SESSION_SECRET | pleaseChangeMe | String  |             |
| SESSION_SECURE | false          | Boolean | Set to true if using behind HTTPs |
| HOST           | localhost      | String  |             |
| LOG_FOLDER     | logs           | String  |             |
| LOG_NAME       | robinson       | String  |             |
| LOG_LEVEL      | info           | String  |             |
| PROXY_ADDRESS  | undefined      | String  |             |
| RATE_LIMIT     | 1000           | Integer |             |