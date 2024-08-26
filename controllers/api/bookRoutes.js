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

module.exports = router;

router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('Attempting to update book:', req.params.id);
    console.log('New status:', req.body.status);

    const updatedBook = await Book.update(
      { status: req.body.status },
      { where: { id: req.params.id, user_id: req.session.user_id } },
    );

    console.log('Update result:', updatedBook);

    if (updatedBook[0] === 0) {
      console.log('No book found with this id');
      res.status(404).json({ message: 'No book found with this id' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(400).json(err);
  }
});
