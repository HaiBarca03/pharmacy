const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'categories',
    timestamps: false
  }
)

module.exports = Category
