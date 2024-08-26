const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const wishlistRoutes = require('./api/wishlistRoutes'); 

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api/wishlist', wishlistRoutes);

module.exports = router;
