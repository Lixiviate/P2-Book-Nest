const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

// Signup Route http://localhost:3001/api/users/signup
router.post('/signup', async (req, res) => {
  try {
    // Enforce password length validation
    if (req.body.password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long.',
      });
    }
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.loggedIn = true;
      res.status(200).json({
        user: userData,
        message: 'You have signed up and are now logged in!',
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login Route http://localhost:3001/api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password,
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout Route http://localhost:3001/api/users/logout
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
