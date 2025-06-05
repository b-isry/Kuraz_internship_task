# Task API

A simple Express.js backend for managing tasks.

## Features

- List all tasks, or filter by status (`completed` or `pending`)
- Add, update, and delete tasks
- Validates that task titles are not empty

## Endpoints

- `GET /tasks?status=[completed|pending]` — List tasks, optionally filtered by status
- `POST /tasks` — Add a new task (`{ "title": "Task name" }`)
- `PUT /tasks/:id` — Update a task (`{ "title": "New title", "completed": true }`)
- `DELETE /tasks/:id` — Delete a task
- `GET /ping` — Health check

## Usage

1. Install dependencies:
    ```
    npm install express
    ```

2. Start the server:
    ```
    node server.js
    ```

3. The server runs at [http://localhost:3000](http://localhost:3000)

