const { Cart, CartItem, Product } = require('../entities')

const createCartAndAddProduct = async (userId, productId, quantity = 1) => {
  const product = await Product.findByPk(productId)
  if (!product) throw new Error('Sản phẩm không tồn tại')

  let cart = await Cart.findOne({ where: { user_id: userId } })
  if (!cart) {
    cart = await Cart.create({ user_id: userId })
  }

  let cartItem = await CartItem.findOne({
    where: {
      cart_id: cart.id,
      product_id: productId
    }
  })

  if (cartItem) {
    cartItem.quantity += quantity
    await cartItem.save()
  } else {
    await CartItem.create({
      cart_id: cart.id,
      product_id: productId,
      quantity,
      price: product.price
    })
  }

  return await Cart.findOne({
    where: { id: cart.id },
    include: [{ model: CartItem, include: [Product] }]
  })
}

const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: [
        {
          model: CartItem,
          include: [Product]
        }
      ]
    })

    if (!cart) {
      return { success: false, message: 'Cart not found' }
    }

    return { success: true, cart }
  } catch (error) {
    console.error('Error getting cart:', error)
    return { success: false, message: 'Server error', error }
  }
}

const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: userId } })
    if (!cart) {
      return { success: false, message: 'Cart not found' }
    }

    const cartItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: productId
      }
    })

    if (!cartItem) {
      return { success: false, message: 'Product not found in cart' }
    }

    cartItem.quantity = quantity
    await cartItem.save()

    return {
      success: true,
      message: 'Cart item updated successfully',
      cartItem
    }
  } catch (error) {
    console.error('Error updating cart item:', error)
    return { success: false, message: 'Server error', error }
  }
}

const deleteCartItems = async (userId, productIds) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: userId } })
    if (!cart) {
      return { success: false, message: 'Cart not found' }
    }

    const deletedCount = await CartItem.destroy({
      where: {
        cart_id: cart.id,
        product_id: productIds
      }
    })

    return {
      success: true,
      message: `Deleted ${deletedCount} item(s) from cart`
    }
  } catch (error) {
    console.error('Error deleting cart items:', error)
    return { success: false, message: 'Server error', error }
  }
}

module.exports = {
  createCartAndAddProduct,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItems
}
