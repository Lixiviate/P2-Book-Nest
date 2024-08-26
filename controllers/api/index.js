const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const bookRoutes = require('./bookRoutes');
const wishlistRoutes = require('./wishlistRoutes');

router.use('/users', userRoutes);
router.use('/profile', profileRoutes);
router.use('/books', bookRoutes);
router.use('/wishlist', wishlistRoutes);

module.exports = router;
