import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../../stores/Order/OrderApis'
import { Card, Typography, Tag, Image, Row, Col, List } from 'antd'
import './OrderDetailPage.css'

const { Title, Text } = Typography

const statusColor = {
  cancelled: 'red',
  pending: 'orange',
  completed: 'green',
  processing: 'blue'
}

const OrderDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const orderDetail = useSelector((state) => state.order.orderDetails || {})

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [dispatch, id])

  if (!orderDetail || !orderDetail.id) {
    return <Text>Đang tải chi tiết đơn hàng...</Text>
  }

  return (
    <div className="order-detail-container">
      <div className="category-header">
        <p className="breadcrumb">
          <a href="/" className="breadcrumb-home">
            Trang chủ
          </a>{' '}
          &raquo; <span className="breadcrumb-category">Chi tiết đơn hàng</span>
        </p>
        <h2 className="category-title">Chi tiết đơn hàng</h2>
      </div>

      <Card className="order-detail-card">
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong>Mã đơn: {orderDetail.id}</Text>
          </Col>
          <Col>
            <Tag
              color={statusColor[orderDetail.status] || 'default'}
              className="order-status-tag"
            >
              {orderDetail.status?.toUpperCase()}
            </Tag>
          </Col>
        </Row>

        <Row gutter={[16, 8]} className="order-meta-info">
          <Col span={12}>
            <Text>
              Ngày đặt: {new Date(orderDetail.order_date).toLocaleString()}
            </Text>
          </Col>
          <Col span={12}>
            <Text strong>Tổng tiền: </Text>
            <Text type="danger">
              {Number(orderDetail.total_price).toLocaleString('vi-VN')}₫
            </Text>
          </Col>
          <Col span={24}>
            <Text strong>Khách hàng: </Text>
            {orderDetail.User?.name} ({orderDetail.User?.email})
          </Col>
        </Row>

        <Title level={4} style={{ marginTop: '1rem' }}>
          Sản phẩm
        </Title>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={orderDetail.items}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card
                hoverable
                cover={
                  <Image
                    src={item.product.image_url?.[0]}
                    alt={item.product.name}
                    className="product-image"
                    preview={false}
                  />
                }
              >
                <Card.Meta
                  title={item.product.name}
                  description={
                    <>
                      <Text>Số lượng: {item.quantity}</Text>
                      <br />
                      <Text>
                        Giá: {Number(item.price).toLocaleString('vi-VN')}₫
                      </Text>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default OrderDetailPage
