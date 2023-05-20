// index.js server as the entry point of the application. Responsible for initializing. Keep it minimal and primarily responsible for starting the server.
const express = require('express')
const app = express()
const port = 3000
const usersRoutes = require('./routes/usersRoutes');

app.use(express.json());

app.use('/users', usersRoutes);

app.get('/', (request, response) => {
  response.json({ info: 'This is my E-commerce Rest API!' })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
