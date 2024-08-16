const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Holder extends Model {}

Holder.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        references: {
            model: 'user',
            key: 'username'
        },
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'book',
            key: 'id'
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'holder',
  }
);

module.exports = Holder;
