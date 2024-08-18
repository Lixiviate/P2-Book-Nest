const User = require('./User');
const Book = require('./Book');
const Holder = require('./Holder');

User.hasMany(Book, {
  foreignKey: 'user_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

Holder.belongsTo(Book, {
  foreignKey: 'book_id',
});

Book.hasOne(Holder, {
  foreignKey: 'book_id',
});

module.exports = { User, Book, Holder };
