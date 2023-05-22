const express = require('express')
const app = express()
const port = 3000
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/checkout', checkoutRoutes);

app.get('/', (request, response) => {
  response.json({ info: 'This is my E-commerce Rest API!' })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
