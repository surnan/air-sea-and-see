const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
const csrfProtection = csurf({ cookie: true });
// Use csrfProtection middleware for routes that require CSRF protection
app.use(csrfProtection);
app.use(express.json());
// backend/app.js

const routes = require('./routes');

// ...

app.use(routes); // Connect all the routes


// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

module.exports = app;

/*
require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/reviews', require('./routes/reviews'));
app.use('/spots', require('./routes/spots'));
app.use('/pics', require('./routes/pics'));
app.use('/bookings', require('./routes/bookings'));
app.use('/search', require('./routes/search'));


//PUT IN BY ME --- BELOW
app.use((err, req, res, next) => {
  res.status(404)
  return es.json({
    message: err.message
  })
})
//PUT IN BY ME --- ABOVE              


if (require.main === module) {
  const port = 8004;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
*/