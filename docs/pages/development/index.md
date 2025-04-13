---
layout: page
title: Development
nav_order: 3
has_children: true
---

# Development

Follow the steps below to get a local development environment up and running 

-   `git clone https://github.com/ryanmccartney/robinson`
-   `cd ./backend && npm i`
-   `cd ./frontend && npm i`
-   `docker compose up -d`

Find the development frontend on `http://localhost:3000` and self-documenting API backend at `http://localhost:3100/api`

# Before opening a Pull Request

* Do tests pass?
* Is formatting correct (`npm run format:fix`)?
* Any linting errors (`npm run lint`)?
* If your PR fixes a bug, is their an issue for it?

# Opening a Pull Request

## ❓Context
*Gives the reviewer some context about the work and why this change is being made, the WHY you are doing this. This field goes more into the product perspective.*

## 📖 Description
*Provide a detailed description of how exactly this task will be accomplished. This can be something technical. What specific steps will be taken to achieve the goal? This should include details on service integration, job logic, implementation, etc.*

## Changes in the codebase
*This is where becomes technical. Here is where you can be more focused on the engineering side of your solution. Include information about the functionality they are adding or modifying, as well as any refactoring or improvement of existing code.*
 updates to third-party services, changes to infrastructure configuration, integration with external APIs, etc.*

 * [ ] - Frontend changes
 * [ ] - Backend changes
 * [ ] - CI/CD and helper script changes
 * [ ] - Documentation changes

## Aditional information
*Provide any additional information that might be useful to the reviewer in evaluating this pull request. This could include performance considerations,design choices, etc.*
