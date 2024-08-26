const router = require('express').Router();
const { Book } = require('../../models');
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

// Check if a book exists by ISBN
router.post('/check', withAuth, async (req, res) => {
  try {
    const book = await Book.findOne({
      where: { isbn: req.body.isbn },
    });

    if (book) {
      res.status(200).json({ exists: true, book_id: book.id });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to check book existence' });
  }
});

// Validate data and create book if correct

router.post('/', withAuth, async (req, res) => {
  const { title, author, cover_img, isbn, status, addToLibrary } = req.body;

  if (!title || !author || !isbn) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the book is being added to the library or just to the wishlist
    const newBook = await Book.create({
      title,
      author,
      cover_img,
      isbn,
      status: addToLibrary ? 'Available' : null, // Only set status if adding to library
      user_id: addToLibrary ? req.session.user_id : null, // Only associate with the user if adding to library
    });

    res.status(200).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

module.exports = router;
