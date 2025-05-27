const { Order, OrderItem, Product, User } = require('../entities')
const createOrderService = async (user_id, items) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('Danh sách sản phẩm không hợp lệ')
  }

  const total_price = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  )

  const order = await Order.create({ user_id, total_price })

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }))

  await OrderItem.bulkCreate(orderItems)

  return order
}

const getOrdersByUser = async (filter) => {
  const orders = await Order.findAll({
    where: filter,
    include: [
      {
        model: OrderItem,
        as: 'items',
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'image_url']
          }
        ]
      }
    ],
    order: [['order_date', 'DESC']]
  })

  return orders
}

const getOrderById = async (orderId) => {
  const order = await Order.findByPk(orderId, {
    include: [
      {
        model: OrderItem,
        as: 'items',
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'image_url']
          }
        ]
      },
      {
        model: User,
        attributes: ['user_id', 'name', 'email']
      }
    ]
  })

  if (!order) {
    throw new Error('Không tìm thấy đơn hàng')
  }

  return order
}

const cancelOrder = async (orderId) => {
  const order = await Order.findByPk(orderId)

  if (!order) {
    throw new Error('Không tìm thấy đơn hàng')
  }

  if (order.status === 'completed' || order.status === 'cancelled') {
    throw new Error(`Không thể hủy đơn đang ở trạng thái ${order.status}`)
  }

  order.status = 'cancelled'
  await order.save()

  return order
}

const getAllOrders = async ({ filter, page, limit }) => {
  const offset = (page - 1) * limit

  const total = await Order.count({ where: filter })

  const orders = await Order.findAll({
    where: filter,
    include: [
      {
        model: OrderItem,
        as: 'items',
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'image_url']
          }
        ]
      },
      {
        model: User,
        attributes: ['user_id', 'name', 'email']
      }
    ],
    order: [['order_date', 'DESC']],
    limit,
    offset
  })

  return { total, orders }
}

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByPk(orderId)
  if (!order) return null

  order.status = status
  await order.save()

  return order
}

const deleteOrder = async (orderId) => {
  await OrderItem.destroy({ where: { order_id: orderId } })

  const deleted = await Order.destroy({ where: { id: orderId } })

  return deleted > 0
}

module.exports = {
  createOrderService,
  getOrdersByUser,
  getOrderById,
  cancelOrder,
  getAllOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
}
