import React, { useEffect, useState } from 'react'
import {
  Table,
  Tag,
  Select,
  Button,
  Popconfirm,
  message,
  Space,
  Modal
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from '../../../stores/Order/OrderApis'
import OrderDetail from '../../../components/Order/OrderDetailCpn'

const { Option } = Select

const AdminOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const allOrders = useSelector((state) => state.order.orderList || [])

  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    dispatch(getAllOrders(filterStatus, page, pageSize))
  }, [dispatch, filterStatus, page, pageSize])

  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true)
    await dispatch(updateOrderStatus(orderId, newStatus))
    message.success('Cập nhật trạng thái thành công!')
    await dispatch(getAllOrders(filterStatus, page, pageSize))
    setLoading(false)
  }

  const handleDelete = async (orderId) => {
    setLoading(true)
    await dispatch(deleteOrder(orderId))
    message.success('Xóa đơn hàng thành công!')
    await dispatch(getAllOrders(filterStatus, page, pageSize))
    setLoading(false)
  }

  const handleViewDetail = (orderId) => {
    const order = allOrders.find((o) => o.id === orderId)
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      render: (text) => (
        <span style={{ fontWeight: 500 }}>{text.slice(0, 8)}...</span>
      )
    },
    {
      title: 'Khách hàng',
      dataIndex: ['User', 'name'],
      key: 'user'
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (text) => new Date(text).toLocaleString()
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => `${(+price).toLocaleString()} ₫`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="completed">Confirmed</Option>
          <Option value="shipping">Shipping</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleViewDetail(record.id)}>
            Xem chi tiết
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa đơn hàng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div>
      <h2>Quản lý đơn hàng</h2>

      <div style={{ marginBottom: 16 }}>
        <span>Lọc trạng thái: </span>
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: 200 }}
          allowClear
          placeholder="Chọn trạng thái"
        >
          <Option value="">Tất cả</Option>
          <Option value="pending">Pending</Option>
          <Option value="completed">Confirmed</Option>
          <Option value="shipping">Shipping</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </div>

      <Table
        rowKey="id"
        dataSource={allOrders}
        columns={columns}
        pagination={{
          current: page,
          pageSize,
          onChange: (p, ps) => {
            setPage(p)
            setPageSize(ps)
          },
          showSizeChanger: true
        }}
        loading={loading}
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <OrderDetail order={selectedOrder} />
      </Modal>
    </div>
  )
}

export default AdminOrder
