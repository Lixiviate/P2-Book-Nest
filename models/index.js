const User = require('./User');
const Book = require('./Book');
const Holder = require('./Holder');
const Wishlist = require('./Wishlist');

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

// User/Wishlist association (Wishlist)
Wishlist.belongsTo(User, {
  foreignKey: 'user_id',
});

Wishlist.belongsTo(Book, {
  foreignKey: 'book_id',
});

User.hasMany(Wishlist, {
  foreignKey: 'user_id',
});

Book.hasMany(Wishlist, {
  foreignKey: 'book_id',
});

module.exports = { User, Book, Holder, Wishlist };
