# Phone Number Spam Detection API

This is a REST API built with Node.js, Express, TypeScript, Sequelize, and MySQL. The API allows users to register, mark phone numbers as spam, search for contacts by name or phone number, and view contact details along with spam likelihood.

## Setup

1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the root directory and add the following environment variables:

```bash

PORT=9000
DB_USERNAME=
DB_PASSWORD=""
DB_NAME=your_db_name
DB_HOST=
DB_PORT=
DB_DRIVER=mysql
NODE_ENV=development | production
JWT_SECRET=
SALT=10

```

Replace the values with your own configuration. Make sure to use a strong secret for `JWT_SECRET`.

4. Start the server by running `npm start`.

## Environment Variables

- `PORT`: The port on which the server will run (default: 9000).
- `DB_USERNAME`: The username for your MySQL database.
- `DB_PASSWORD`: The password for your MySQL database.
- `DB_NAME`: The name of the database you want to use.
- `DB_HOST`: The host address for your MySQL database (default: 127.0.0.1).
- `DB_PORT`: The port for your MySQL database (default: 3306).
- `DB_DRIVER`: The database driver you're using (default: mysql).
- `NODE_ENV`: The environment in which the app is running (default: development).
- `JWT_SECRET`: The secret key used for JSON Web Token (JWT) authentication.
- `SALT`: The number of rounds for salting user passwords (default: 10).

## Postman Collection

You can import the Postman collection for testing the API endpoints: [Postman Collection Link](https://grey-escape-207290.postman.co/workspace/PohutechLabs~04a79a6e-f8a0-43cf-8030-b20bceace0da/collection/24517097-8f40429e-0b69-40f8-877c-4fb9a942d002?action=share&creator=24517097)

The base URL for the API is `http://localhost:9000/api/v1`.

## Features

- User registration
- User login
- Mark phone numbers as spam
- Search for contacts by name or phone number
- View contact details with spam likelihood
- Email visibility based on contact list permissions

## Technologies Used

- Node.js
- Express
- TypeScript
- Sequelize (ORM)
- MySQL
- JSON Web Tokens (JWT) for authentication
