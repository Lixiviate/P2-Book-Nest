const router = require('express').Router();
const { User, Book, Holder } = require('../models');

// GET all books for homepage
router.get('/', async (req, res) => {
  try {
    const dbBookData = await Book.findAll({
      include: [
        {
          model: User,
          as: 'user', // Owner of the book
          attributes: ['username'],
        },
        {
          model: Holder,
          include: [
            {
              model: User,
              attributes: ['username'], // Username of the holder
            },
          ],
        },
      ],
    });

    const books = dbBookData.map((book) => book.get({ plain: true }));
    res.render('homepage', {
      books,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
