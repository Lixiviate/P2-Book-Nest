const router = require('express').Router();

const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes);
router.use('/profile', profileRoutes);
router.use('/books', bookRoutes);

module.exports = router;
