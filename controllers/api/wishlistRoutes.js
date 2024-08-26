const router = require('express').Router();
const { Wishlist, Book } = require('../../models');
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

// DELETE route for removing items from wishlist

router.delete('/remove', withAuth, async (req, res) => {
  try {
    const { isbn } = req.body;
    const book = await Book.findOne({ where: { isbn } });

    if (book) {
      await Wishlist.destroy({
        where: {
          user_id: req.session.user_id,
          book_id: book.id,
        },
      });
      res.status(200).json({ message: 'Book removed from wishlist' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove book from wishlist' });
  }
});

module.exports = router;
