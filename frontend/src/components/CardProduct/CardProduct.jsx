import React from 'react'
import {
  Card,
  Image,
  Typography,
  Button,
  Row,
  Col,
  Tooltip,
  message
} from 'antd'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'
import './CardProduct.css'
import { useDispatch } from 'react-redux'
import { createCart } from '../../stores/Cart/CartApis'

const { Title, Text } = Typography

const CardProduct = ({ product }) => {
  const dispatch = useDispatch()
  const { name, price, image_url, dosage_form, id: productId } = product

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || !user.user_id) {
      message.warning('Vui lòng đăng nhập để thêm vào giỏ hàng')
      return
    }

    await dispatch(
      createCart({
        productId,
        quantity: 1 // bạn có thể thay đổi thành số lượng người dùng chọn
      })
    )
  }

  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <Image
          alt={name}
          src={image_url[0]}
          height={150}
          fallback="https://via.placeholder.com/200x200.png?text=No+Image"
          preview={false}
          onClick={() => (window.location.href = `/product/${productId}`)}
        />
      }
    >
      <Title
        level={5}
        className="product-name"
        onClick={() => (window.location.href = `/product/${productId}`)}
      >
        {name}
      </Title>

      <Row gutter={[8, 8]} className="product-info">
        <Col span={12} className="product-price-col">
          <Text className="product-price">
            {Number(price).toLocaleString()} ₫
          </Text>
        </Col>
        <Col span={12}>
          <Text>{dosage_form}</Text>
        </Col>
      </Row>

      <Row justify="space-between" className="product-actions">
        <Col>
          <Tooltip title="Thêm vào giỏ hàng">
            <Button
              icon={<ShoppingCartOutlined />}
              className="action-btn"
              onClick={handleAddToCart}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Mua ngay">
            <Button
              type="primary"
              icon={<DollarOutlined />}
              className="action-btn buy-now"
              onClick={() => (window.location.href = `/product/${productId}`)}
            >
              Mua ngay
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Card>
  )
}

export default CardProduct
