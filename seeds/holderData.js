const { Holder } = require('../models');

const holderData = [
    {
        username: 'johndoe123',
        book_id: '1'
    },
    {
        username: 'janesmith456',
        book_id: '2'
    },
    {
        username: 'alicejohnson789',
        book_id: '3'
    },
    {
        username: 'bobwilson101',
        book_id: '4'
    },
    {
        username: 'gracetaylor202',
        book_id: '5',
    },
];

const seedHolders = () => Holder.bulkCreate(holderData);

module.exports = seedHolders;