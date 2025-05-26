const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const CartItem = sequelize.define(
  'CartItem',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    cart_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    tableName: 'cart_items',
    timestamps: false
  }
)

module.exports = CartItem
