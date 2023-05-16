// index.js server as the entry point of the application. Responsible for initializing. Keep it minimal and primarily responsible for starting the server.
const { Pool } = require('pg');
const port = 3000
const express = require('express')

require('dotenv').config();

// database connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.get('/', (request, response) => {
  response.json({ info: 'This is my E-commerce Rest API!' })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

