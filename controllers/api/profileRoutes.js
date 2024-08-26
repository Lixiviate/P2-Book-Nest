const router = require('express').Router();
const { User, Book } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

router.put('/username-update', async (req, res) => {
  try {
    //Check if username already exists
    const userExists = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (userExists) {
      res.status(400).json({ message: 'This username already exists.' });
      return;
    } else {
      // Update username to what was entered in the form
      const updateUsername = await User.update(
        {
          username: req.body.username,
        },
        {
          where: {
            username: req.session.username,
          },
        },
      );

      // If the update went well, make sure to update the session object so when the page refreshes the form has the correct default value.
      if (updateUsername) {
        req.session.save(() => {
          req.session.username = req.body.username;
        });

        res.render('profile', {
          username: req.session.username,
          email: req.session.email,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/email-update', async (req, res) => {
  try {
    //Check if email already exists
    const emailExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailExists) {
      res.status(400).json({ message: 'This email already exists.' });
      return;
    } else {
      // Update email to what was entered in the form
      const updateEmail = await User.update(
        {
          email: req.body.email,
        },
        {
          where: {
            email: req.session.email,
          },
        },
      );

      // If the update went well, make sure to update the session object so when the page refreshes the form has the correct default value.
      if (updateEmail) {
        req.session.save(() => {
          req.session.email = req.body.email;
        });

        res.render('profile', {
          username: req.session.username,
          email: req.session.email,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/password-update', async (req, res) => {
  try {
    // grab the current user to get their password object for bcrypt.compare
    const currentUser = await User.findOne({
      where: {
        username: req.session.username,
      },
    });

    const userSimple = currentUser.get({ plain: true });

    const validPassword = await bcrypt.compare(
      req.body.password,
      userSimple.password,
    );

    if (validPassword) {
      res
        .status(400)
        .json({ message: 'Cannot user current password.' });
      return;

    } else {
        // Update password to what was entered in the form, and make sure to let sequelize know to listen to the hooks in the model.
        const updatePassword = await User.update(
            {
                password: req.body.password,
            },
            {
                where: {
                    username: req.session.username,
                },
                individualHooks: true,
            },
        );

        // Refresh the page so the username form is blank again.
        if(updatePassword) {
            res.render('profile', {
                username: req.session.username,
                email: req.session.email,
            });
        };
    };
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE route for removing a book from the user's library
router.delete('/library/:id', withAuth, async (req, res) => {
  try {
    const bookId = req.params.id;

    const deleted = await Book.destroy({
      where: {
        id: bookId,
        user_id: req.session.user_id, // Ensure the book belongs to the logged-in user
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'No book found with this id' });
    }

    res.status(200).json({ message: 'Book removed from library' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove book from library' });
  }
});

module.exports = router;
