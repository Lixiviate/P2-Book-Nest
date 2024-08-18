const { Holder } = require('../models');

const holderData = [
  {
    user_id: 1,
    book_id: 1,
  },
  {
    user_id: 2,
    book_id: 2,
  },
  {
    user_id: 3,
    book_id: 3,
  },
  {
    user_id: 4,
    book_id: 4,
  },
  {
    user_id: 5,
    book_id: 5,
  },
];

const seedHolders = () => Holder.bulkCreate(holderData);

module.exports = seedHolders;
