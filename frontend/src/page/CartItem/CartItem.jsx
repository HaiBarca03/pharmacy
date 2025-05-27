import React, { useState } from 'react'
import { Card, Button, InputNumber, Tooltip, message } from 'antd'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import './CartItem.css'
import { useDispatch } from 'react-redux'
import { updateCart, getMyCart, deleteCart } from '../../stores/Cart/CartApis'

const CartItem = ({ item, userId, selectedItems, setSelectedItems }) => {
  const dispatch = useDispatch()
  const { id, price, quantity: initialQty, Product, product_id } = item
  const { name, image_url } = Product
  const [quantity, setQuantity] = useState(initialQty)
  const productId = product_id
  const image = image_url?.[0] || 'https://via.placeholder.com/60'

  const handleSave = async () => {
    if (!userId) return
    await dispatch(updateCart(userId, { productId, quantity }))
    dispatch(getMyCart(userId))
  }

  const handleDelete = async () => {
    if (!userId) return
    await dispatch(deleteCart(userId, { productIds: [product_id] }))
    dispatch(getMyCart(userId))
  }
  const isChecked = selectedItems.includes(item.id)

  const toggleCheckbox = () => {
    if (isChecked) {
      setSelectedItems(selectedItems.filter((id) => id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item.id])
    }
  }

  return (
    <Card className="cart-item">
      <div className="item-container">
        <div className="item-select">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={toggleCheckbox}
          />
        </div>

        <div className="item-main">
          <img src={image} alt={name} className="item-image" />
          <div className="item-details">
            <h3>{name}</h3>
            <p className="discounted-price">{(+price).toLocaleString()} đ</p>
          </div>
        </div>

        <div className="item-actions">
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value)}
            className="quantity-input"
          />
          <p className="item-total">{(price * quantity).toLocaleString()} đ</p>
          <div className="action-buttons">
            <Tooltip title="Lưu thay đổi">
              <Button
                icon={<SaveOutlined />}
                type="text"
                className="action-icon"
                onClick={handleSave}
              />
            </Tooltip>
            <Tooltip title="Xoá sản phẩm">
              <Button
                icon={<DeleteOutlined />}
                type="text"
                danger
                className="action-icon"
                onClick={handleDelete}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CartItem
