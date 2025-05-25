const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Order = sequelize.define(
  'Order',
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
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('pending', 'shipping', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    tableName: 'orders',
    timestamps: false
  }
)

module.exports = Order
