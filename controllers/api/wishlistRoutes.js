const router = require('express').Router();
const { Wishlist } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for adding book to the wishlist

router.post('/wishlist', withAuth, async (req, res) => {
  try {
    const { book_id } = req.body;

    const wishlistItem = await Wishlist.create({
      user_id: req.session.user_id,
      book_id,
    });

    res.status(200).json({ message: 'Book added to wishlist!', wishlistItem });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
