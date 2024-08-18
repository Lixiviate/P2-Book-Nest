const { User } = require('../models');
const bcrypt = require('bcrypt');

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
    password: 'bob_secure101$',
  },
  {
    username: 'gracetaylor202',
    email: 'gracetaylor202@example.com',
    password: 'grace202!safe',
  },
];

const seedUsers = async () => {
  for (const user of userData) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  await User.bulkCreate(userData);
};

module.exports = seedUsers;
