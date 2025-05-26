module.exports = ({
  User,
  Product,
  Order,
  OrderItem,
  Article,
  HealthConsultation,
  Category,
  Cart,
  CartItem
}) => {
  // User → Orders
  User.hasMany(Order, { foreignKey: 'user_id' })
  Order.belongsTo(User, { foreignKey: 'user_id' })

  // User → HealthConsultation
  User.hasMany(HealthConsultation, { foreignKey: 'user_id' })
  HealthConsultation.belongsTo(User, { foreignKey: 'user_id' })

  // User → Articles
  User.hasMany(Article, { foreignKey: 'author_id' })
  Article.belongsTo(User, { foreignKey: 'author_id' })

  // Order → OrderItems
  Order.hasMany(OrderItem, { foreignKey: 'order_id' })
  OrderItem.belongsTo(Order, { foreignKey: 'order_id' })

  // Product → OrderItems
  Product.hasMany(OrderItem, { foreignKey: 'product_id' })
  OrderItem.belongsTo(Product, { foreignKey: 'product_id' })

  // Category → Products
  Category.hasMany(Product, { foreignKey: 'category_id' })
  Product.belongsTo(Category, { foreignKey: 'category_id' })

  // Cart -> CartItems
  Cart.hasMany(CartItem, { foreignKey: 'cart_id' })
  CartItem.belongsTo(Cart, { foreignKey: 'cart_id' })

  // CartItem → Product
  Product.hasMany(CartItem, { foreignKey: 'product_id' })
  CartItem.belongsTo(Product, { foreignKey: 'product_id' })

  // User → Cart
  User.hasOne(Cart, { foreignKey: 'user_id' })
  Cart.belongsTo(User, { foreignKey: 'user_id' })
}
