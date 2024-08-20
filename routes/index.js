// routes/index.js
// const router = require('express').Router();
// const userRoutes = require('./api/userRoutes');
// const thoughtRoutes = require('./api/thoughtRoutes');

// router.use('/users', userRoutes);
// router.use('/thoughts', thoughtRoutes);

// module.exports = router;

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.status(404).send('Not found'));

module.exports = router;