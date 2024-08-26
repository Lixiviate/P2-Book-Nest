const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// Get books by user_id
router.get('/:user_id', async (req, res) => {
  try {
    const usersBooks = await Book.findAll({
      where: { user_id: req.params.user_id },
    });
    res.render('profile', { usersBooks });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Add a new book
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

// Update book status
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
