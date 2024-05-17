// backend/routes/api/index.js
const router = require('express').Router();

module.exports = router;

// backend/routes/index.js
// ...
const apiRouter = require('./api');

router.use('/api', apiRouter);
// ...

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});