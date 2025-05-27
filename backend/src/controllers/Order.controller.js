const orderService = require('../services/Order.service')

const createOrder = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const { items } = req.body

    const order = await orderService.createOrderService(user_id, items)

    res.status(201).json({
      message: 'Tạo đơn hàng thành công',
      order_id: order.id
    })
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error.message)
    res.status(500).json({ message: error.message || 'Lỗi máy chủ' })
  }
}

const getMyOrders = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const { status } = req.query

    const filter = { user_id }
    if (status) {
      filter.status = status
    }

    const orders = await orderService.getOrdersByUser(filter)

    res.status(200).json({
      message: 'Lấy danh sách đơn hàng thành công',
      data: orders
    })
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error.message)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

const getOrderById = async (req, res) => {
  const orderId = req.params.id
  const currentUserId = req.user.user_id
  if (!orderId) {
    return res.status(400).json({ message: 'Thiếu ID đơn hàng' })
  }
  try {
    const order = await orderService.getOrderById(orderId)

    if (order.user_id !== currentUserId && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Bạn không có quyền truy cập đơn hàng này' })
    }

    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const cancelOrderController = async (req, res) => {
  const { id } = req.params
  const userId = req.user.user_id

  try {
    const orderById = await orderService.getOrderById(id)

    if (orderById.user_id !== userId && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Bạn không có quyền truy cập đơn hàng này' })
    }
    const order = await orderService.cancelOrder(id)
    return res.status(200).json({ message: 'Hủy đơn thành công', order })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)

    const filter = {}
    if (status) {
      filter.status = status
    }

    const result = await orderService.getAllOrders({
      filter,
      page: pageNum,
      limit: limitNum
    })

    res.status(200).json({
      message: 'Lấy danh sách đơn hàng thành công',
      data: result.orders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.total
      }
    })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error.message)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const validStatuses = ['pending', 'shipping', 'completed', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ' })
    }

    const updatedOrder = await orderService.updateOrderStatus(id, status)
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' })
    }

    res.status(200).json({
      message: 'Cập nhật trạng thái đơn hàng thành công',
      data: updatedOrder
    })
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error.message)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await orderService.deleteOrder(id)
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' })
    }

    res.status(200).json({ message: 'Xoá đơn hàng thành công' })
  } catch (error) {
    console.error('Lỗi khi xoá đơn hàng:', error.message)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrderController,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
}
