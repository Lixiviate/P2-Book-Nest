const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'book',
            key: 'id'
        }
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
}
);
  
  module.exports = Comment;