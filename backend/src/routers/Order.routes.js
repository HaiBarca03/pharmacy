const express = require('express')
const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrderController,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/Order.controller')
const { authorizeUser, authorizeAdmin } = require('../middlewares/auth')

const router = express.Router()

router.post('/', authorizeUser, createOrder)
router.get('/all-orders', authorizeAdmin, getAllOrders)
router.get('/my-order', authorizeUser, getMyOrders)
router.get('/:id', authorizeUser, getOrderById)
router.put('/:id/cancel', authorizeUser, cancelOrderController)
router.put('/:id/status', authorizeAdmin, updateOrderStatus)
router.delete('/:id', authorizeAdmin, deleteOrder)

module.exports = router
