import React, { useEffect, useState } from 'react'
import { Button, Row, Col, message } from 'antd'
import './Cart.css'
import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyCart } from '../../stores/Cart/CartApis'
import { createOrder } from '../../stores/Order/OrderApis'

const Cart = () => {
  const myCartList = useSelector((state) => state.cart.MyCartList || {})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedItems, setSelectedItems] = useState([])

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

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      return message.warning('Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!')
    }
    navigate('/payment', { state: { selectedItems } })
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <h2>Giỏ hàng ({cartItems.length})</h2>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              userId={userId}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ))}
        </div>
        <div className="cart-summary">
          <Row className="total-section">
            <Col span={12}>Tổng tiền:</Col>
            <Col span={12} className="total-amount">
              {total.toLocaleString()} đ
            </Col>
          </Row>
          <Button
            type="primary"
            className="checkout-button"
            onClick={handleCheckout}
          >
            Mua hàng ({selectedItems.length})
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
