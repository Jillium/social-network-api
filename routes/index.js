const router = require('express').Router();
// import all of the api routes from /api/index.js
const apiRoutes = require('./api');

// add prefix of /api to all of the api routes imported from the api directory
router.use('/api', apiRoutes);



module.exports = router;