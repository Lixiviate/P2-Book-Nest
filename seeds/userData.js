const { User } = require('../models');

const userData = [
  {
    username: 'johndoe123',
    email: 'johndoe123@example.com',
    password: 'password123!',
  },
  {
    username: 'janesmith456',
    email: 'janesmith456@example.com',
    password: 'securepass456@',
  },
  {
    username: 'alicejohnson789',
    email: 'alicejohnson789@example.com',
    password: 'alice789#pass',
  },
  {
    username: 'bobwilson101',
    email: 'bobwilson101@example.com',
    password: 'bob_secure101',
  },
  {
    username: 'gracetaylor202',
    email: 'gracetaylor202@example.com',
    password: 'grace202!safe',
  },
];

const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};

module.exports = seedUsers;
