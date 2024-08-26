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

// Add book to library

router.post('/', withAuth, async (req, res) => {
  const { title, author, cover_img, isbn, status } = req.body;

  if (!title || !author || !isbn) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newBook = await Book.create({
      title,
      author,
      cover_img,
      isbn,
      status, 
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

router.post('/wishlist', withAuth, async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming request body
  const { title, author, cover_img, isbn } = req.body;

  if (!title || !author || !isbn) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the book already exists in the database
    let book = await Book.findOne({ where: { isbn } });
    console.log('Found book:', book); // Log if the book was found

    if (!book) {
      // Create the book if it doesn't exist
      book = await Book.create({
        title,
        author,
        cover_img,
        isbn,
        status: null, // No status needed for wishlist books
        user_id: null, // No association with user for wishlist books
      });
      console.log('Created book:', book); // Log the created book
    }

    res.status(200).json(book);
  } catch (err) {
    console.error('Error creating book for wishlist:', err); // Log the error
    res.status(500).json({ message: 'Failed to add book to wishlist' });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBook = await Book.update(
      { status: req.body.status },
      { where: { id: req.params.id, user_id: req.session.user_id } },
    );

    if (updatedBook[0] === 0) {
      res.status(404).json({ message: 'No book found with this id' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
