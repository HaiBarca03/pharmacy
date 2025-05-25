const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Article = sequelize.define(
  'Article',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    tableName: 'articles',
    timestamps: false
  }
)

module.exports = Article
