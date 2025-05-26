import React, { useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import './Cart.css'
import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyCart } from '../../stores/Cart/CartApis'

const Cart = () => {
  const myCartList = useSelector((state) => state.cart.MyCartList || {})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user?.user_id || null

  useEffect(() => {
    if (userId) {
      dispatch(getMyCart(userId))
    }
  }, [dispatch, userId])

  const cartItems = myCartList?.cart?.CartItems || []

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * +item.price,
    0
  )

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <h2>Giỏ hàng ({cartItems.length})</h2>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} userId={userId} />
          ))}
        </div>
        <div className="cart-summary">
          <Row className="total-section">
            <Col span={12}>Tổng tiền:</Col>
            <Col span={12} className="total-amount">
              {total.toLocaleString()} đ
            </Col>
          </Row>
          <Button type="primary" className="checkout-button">
            Mua hàng ({cartItems.length})
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
