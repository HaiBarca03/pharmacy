import React, { useState } from 'react'
import {
  Card,
  Radio,
  Input,
  Form,
  Button,
  message,
  Row,
  Col,
  Divider
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { createOrder } from '../../stores/Order/OrderApis'

const PaymentPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [method, setMethod] = useState('cod')
  const [form] = Form.useForm()

  // Danh sách id item đã chọn từ trang Cart
  const selectedItems = location.state?.selectedItems || []

  // Lấy toàn bộ cart từ store
  const cartItems = useSelector(
    (state) => state.cart.MyCartList?.cart?.CartItems || []
  )

  // Chỉ lọc ra những sản phẩm đã được chọn
  const filteredItems = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  )

  const handlePayment = async (values) => {
    if (filteredItems.length === 0) {
      return message.error('Không có sản phẩm nào được chọn để thanh toán')
    }

    const orderData = {
      items: filteredItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: +item.price
      })),
      payment_method: method,
      fake_payment_info: values || {} // chỉ dùng để debug/mock
    }

    await dispatch(createOrder(orderData))
    navigate('/order')
  }

  return (
    <Card
      title="Thanh toán đơn hàng"
      className="payment-card"
      style={{ maxWidth: 600, margin: 'auto', marginTop: 50 }}
    >
      <Radio.Group
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={{ marginBottom: 20 }}
      >
        <Radio value="cod">Thanh toán khi nhận hàng</Radio>
        <Radio value="stripe">Thanh toán bằng thẻ </Radio>
      </Radio.Group>

      {method === 'stripe' && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handlePayment}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Tên chủ thẻ"
            name="card_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Số thẻ"
            name="card_number"
            rules={[{ required: true, message: 'Vui lòng nhập số thẻ' }]}
          >
            <Input placeholder="4242 4242 4242 4242" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày hết hạn"
                name="expiry"
                rules={[{ required: true, message: 'Nhập ngày hết hạn' }]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[{ required: true, message: 'Nhập CVV' }]}
              >
                <Input placeholder="123" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Button type="primary" htmlType="submit" block>
            Xác nhận thanh toán
          </Button>
        </Form>
      )}

      {method === 'cod' && (
        <Button
          type="primary"
          onClick={() => handlePayment()}
          style={{ marginTop: 20 }}
          block
        >
          Xác nhận đặt hàng (COD)
        </Button>
      )}
    </Card>
  )
}

export default PaymentPage
