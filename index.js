const express = require('express')
const app = express()
const port = 3000

const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const loginRouter = require('./routes/authRoute');

const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: 'secretrestapi',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/login', loginRouter);

app.get('/', (request, response) => {
  response.json({ info: 'This is my E-commerce Rest API!' })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
