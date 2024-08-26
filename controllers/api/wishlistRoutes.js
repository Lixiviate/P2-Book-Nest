const router = require('express').Router();
const { Wishlist } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for adding a book to the wishlist
router.post('/', withAuth, async (req, res) => {
  try {
    const newWishlistItem = await Wishlist.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add book to wishlist' });
  }
});

module.exports = router;
