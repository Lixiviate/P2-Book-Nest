const router = require('express').Router();
const { Book, Wishlist } = require('../../models');
const withAuth = require('../../utils/auth');

// get route for a specific book owner
router.get('/:user_id', async (req, res) => {
  try {
    const usersBooks = await Book.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.render('profile', {
      usersBooks,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// post route for adding book to the wishlist

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
