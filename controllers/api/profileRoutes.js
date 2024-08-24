const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.put('/username-update', async (req, res) => {
    try {

        console.log(`username value is ${req.body.username}`);
        //Check if username already exists
        const userExists = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if(userExists) {

            console.log('userExists dot ok');
            return;
            
        } else {

            console.log('userExists not ok');
            
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

            console.log('after updateUsername');

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

module.exports = router;
