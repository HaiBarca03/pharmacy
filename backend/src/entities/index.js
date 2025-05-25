const sequelize = require('../config/db.config')
const User = require('./User')
const Product = require('./Product')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Article = require('./Article')
const HealthConsultation = require('./HealthConsultation')
const Category = require('./Category')

const db = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Article,
  HealthConsultation,
  Category
}

require('./associations')(db)

module.exports = db
