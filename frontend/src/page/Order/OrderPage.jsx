import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMyOrder } from '../../stores/Order/orderApis'
import { List, Card, Tag, Image, Typography, Row, Col, Select } from 'antd'
import './OrderPage.css'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { Option } = Select

const statusColor = {
  cancelled: 'red',
  pending: 'orange',
  completed: 'green',
  processing: 'blue'
}

const OrderPage = () => {
  const dispatch = useDispatch()
  const myOrder = useSelector((state) => state.order.orderList || [])
  const [filterStatus, setFilterStatus] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getMyOrder(filterStatus))
  }, [dispatch, filterStatus])

  const handleChangeStatus = (value) => {
    setFilterStatus(value)
  }
  const handleDetail = (id) => {
    navigate(`/order/${id}`)
  }
  return (
    <div className="order-page-container">
      <div className="category-header">
        <p className="breadcrumb">
          <a href="/" className="breadcrumb-home">
            Trang chủ
          </a>{' '}
          &raquo; <span className="breadcrumb-category">Đơn hàng của tôi</span>
        </p>
        <h2 className="category-title">Đơn hàng của tôi</h2>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 200 }}
          placeholder="Lọc theo trạng thái"
          allowClear
          value={filterStatus || undefined}
          onChange={handleChangeStatus}
        >
          <Option value="pending">Chờ xử lý</Option>
          <Option value="processing">Đang xử lý</Option>
          <Option value="completed">Hoàn thành</Option>
          <Option value="cancelled">Đã hủy</Option>
        </Select>
      </div>

      <List
        dataSource={myOrder}
        itemLayout="vertical"
        renderItem={(order) => (
          <Card
            key={order.id}
            className="order-card"
            title={
              <>
                <Text strong>Mã đơn: {order.id}</Text>
                <Tag
                  color={statusColor[order.status] || 'default'}
                  className="order-status-tag"
                >
                  {order.status.toUpperCase()}
                </Tag>
              </>
            }
            onClick={() => handleDetail(order.id)}
          >
            <Row gutter={[16, 16]} className="order-info-row">
              <Col span={12}>
                <Text>
                  Ngày đặt: {new Date(order.order_date).toLocaleString()}
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>Tổng tiền: </Text>
                <Text type="danger">
                  {Number(order.total_price).toLocaleString('vi-VN')}₫
                </Text>
              </Col>
            </Row>

            <List
              className="order-items-list"
              dataSource={order.items}
              grid={{ gutter: 16, column: 4 }}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    cover={
                      <Image
                        src={item.product.image_url[0]}
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
        )}
      />
    </div>
  )
}

export default OrderPage
