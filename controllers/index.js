const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./login');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);

module.exports = router;