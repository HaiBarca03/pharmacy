import React from 'react'
import { Card, Descriptions, Table, Image, Tag } from 'antd'
import moment from 'moment'

const OrderDetail = ({ order }) => {
  if (!order) return <p>Không có đơn hàng để hiển thị.</p>

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: ['product', 'image_url'],
      key: 'image',
      render: (images) => (
        <Image
          width={60}
          src={images?.[0]}
          alt="product"
          style={{ borderRadius: 8 }}
        />
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${Number(price).toLocaleString()}₫`
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_, record) =>
        `${(record.quantity * Number(record.price)).toLocaleString()}₫`
    }
  ]

  return (
    <Card
      title={`Chi tiết đơn hàng #${order.id}`}
      bordered
      style={{ margin: 16 }}
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Tên người đặt">
          {order.User?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{order.User?.email}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">
          {moment(order.order_date).format('DD/MM/YYYY HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag
            color={
              order.status === 'pending'
                ? 'blue'
                : order.status === 'completed'
                ? 'green'
                : order.status === 'cancelled'
                ? 'red'
                : 'gray'
            }
          >
            {order.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          <strong>{Number(order.total_price).toLocaleString()}₫</strong>
        </Descriptions.Item>
      </Descriptions>

      <Table
        dataSource={order.items}
        columns={columns}
        pagination={false}
        rowKey="id"
        style={{ marginTop: 24 }}
      />
    </Card>
  )
}

export default OrderDetail
