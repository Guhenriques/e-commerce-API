// index.js server as the entry point of the application. Responsible for initializing. Keep it minimal and primarily responsible for starting the server.

const express = require('express')
//const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);