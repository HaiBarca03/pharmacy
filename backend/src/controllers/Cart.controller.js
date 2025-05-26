const cartService = require('../services/Cart.service')

const createCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user.user_id

    const cart = await cartService.createCartAndAddProduct(
      userId,
      productId,
      quantity
    )

    res.status(200).json({ success: true, cart })
  } catch (error) {
    console.error('Lỗi tạo giỏ hàng:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const getCartByUserId = async (req, res) => {
  const userId = req.params.userId

  const result = await cartService.getCartByUserId(userId)

  if (!result.success) {
    return res.status(404).json(result)
  }

  res.json(result)
}

const updateCartItemQuantity = async (req, res) => {
  const { userId } = req.params
  const { productId, quantity } = req.body
  if (userId !== req.user.user_id || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You can only update your own cart' })
  }
  const result = await cartService.updateCartItemQuantity(
    userId,
    productId,
    quantity
  )

  if (!result.success) {
    return res.status(400).json(result)
  }

  res.json(result)
}

const deleteCartItems = async (req, res) => {
  const { userId } = req.params
  const { productIds } = req.body

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: 'productIds must be a non-empty array' })
  }
  if (userId !== req.user.user_id || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You can only delete your own cart' })
  }
  const result = await cartService.deleteCartItems(userId, productIds)

  if (!result.success) {
    return res.status(400).json(result)
  }

  res.json(result)
}

module.exports = {
  createCart,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItems
}
