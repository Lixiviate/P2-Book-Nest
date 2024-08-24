const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.put('/username-update', async (req, res) => {
    try {

        //Check if username already exists
        const userExists = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if(userExists) {
            res
            .status(400)
            .json({ message: 'This username already exists.' });
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
                }
            );

            // If the update went well, make sure to update the session object so when the page refreshes the form has the correct default value.
            if(updateUsername) {
                req.session.save(() => {
                    req.session.username = req.body.username;
                });

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

router.put('/email-update', async (req, res) => {
    try {

        //Check if username already exists
        const emailExists = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if(emailExists) {
            res
            .status(400)
            .json({ message: 'This email already exists.' });
            return;
        } else {
            // Update username to what was entered in the form
            const updateEmail = await User.update(
                {
                    email: req.body.email,
                },
                {
                    where: {
                        email: req.session.email,
                    },
                }
            );

            // If the update went well, make sure to update the session object so when the page refreshes the form has the correct default value.
            if(updateEmail) {
                req.session.save(() => {
                    req.session.email = req.body.email;
                });

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
})

module.exports = router;
