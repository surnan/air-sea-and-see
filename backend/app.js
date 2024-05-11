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