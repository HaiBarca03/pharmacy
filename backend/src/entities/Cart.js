const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')
const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'carts',
    timestamps: false
  }
)

module.exports = Cart
