const router = require('express').Router();
const userRoutes = require('./user-routes');

// add a prefix of /users to routes in user-routes.js
router.use('/users', userRoutes);

module.exports = router;