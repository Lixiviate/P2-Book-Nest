const User = require('./User');
const Book = require('./Book');
const Holder = require('./Holder');

// User/Book association (Ownership)
User.hasMany(Book, {
  foreignKey: 'user_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

// Holder/Book association
Holder.belongsTo(Book, {
  foreignKey: 'book_id',
});

Book.hasOne(Holder, {
  foreignKey: 'book_id',
});

// User/Holder association (Borrowing)
Holder.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Holder, {
  foreignKey: 'user_id',
});

module.exports = { User, Book, Holder };
