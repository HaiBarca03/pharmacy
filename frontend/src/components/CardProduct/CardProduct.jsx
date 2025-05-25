import React from 'react'
import { Card, Image, Typography, Button, Row, Col, Tooltip } from 'antd'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'
import './CardProduct.css'

const { Title, Text } = Typography

const CardProduct = ({ product }) => {
  const { name, price, image_url, dosage_form, id } = product

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
          onClick={() => (window.location.href = `/product/${id}`)}
        />
      }
    >
      <Title
        level={5}
        className="product-name"
        onClick={() => (window.location.href = `/product/${id}`)}
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
            <Button icon={<ShoppingCartOutlined />} className="action-btn" />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Mua ngay">
            <Button
              type="primary"
              icon={<DollarOutlined />}
              className="action-btn buy-now"
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
