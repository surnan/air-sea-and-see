// backend/routes/api/index.js
const router        = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter   = require('./users.js');

const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);  //Global
router.use('/session', sessionRouter);
router.use('/users', usersRouter);


router.post('/test', function (req, res) {
  try {
    res.json({ requestBody: req.body });
  } catch  (err) {
    err.status  = 401;
    err.title   = 'Test route failed'
    err.errors  = {file: 'api/index/test'}
    return next(err)
  }
});

module.exports = router;