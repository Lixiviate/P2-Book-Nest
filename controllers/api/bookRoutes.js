const router = require('express').Router();
const { Book, User } = require('../../models');
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

router.get('/:isbn/owners', async (req, res) => {
  try {
    console.log('Fetching owners for ISBN:', req.params.isbn);
    const bookOwners = await User.findAll({
      include: [
        {
          model: Book,
          where: { isbn: req.params.isbn },
        },
      ],
    });
    console.log('Found owners:', bookOwners);
    res.json(bookOwners);
  } catch (err) {
    console.error('Error fetching book owners:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
