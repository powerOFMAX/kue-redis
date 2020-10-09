# Kue/Redis Sample using Typescript and Docker
This is a small example showing how Kue and Redis can help us to manage promises.

# What is Kue
Kue is a feature-rich priority job queue for node.js backed by Redis. A key feature of Kue is its clean user-interface for viewing and managing queued, active, failed, and completed jobs.

Kue will process each task and, if any of them fails, it will attempt X times depending on the re-try policy we want to apply. All this information is visible on the Kue dashboard.


# Steps to setup the project
Run `docker-compose up`

Available endpoints 
- `http://localhost:3000/` (this will make jobs)
- `http://localhost:3000/kue-api/` Kue Dashboard

