const express = require('express')
const router = express.Router()
const {
  createCart,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItems
} = require('../controllers/Cart.controller')
const { authorizeUser } = require('../middlewares/auth')

router.post('/', authorizeUser, createCart)
router.get('/:userId', getCartByUserId)
router.put('/:userId', authorizeUser, updateCartItemQuantity)
router.delete('/:userId', authorizeUser, deleteCartItems)

module.exports = router
