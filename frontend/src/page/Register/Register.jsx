import { useState } from 'react'
import { message, Button, Input, Form } from 'antd'
import { useDispatch } from 'react-redux'
import 'antd/dist/reset.css'
import { registerUser } from '../../stores/User/userApis'

const RegisterForm = ({ onRegisterSuccess }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const result = await dispatch(registerUser(values))
      if (result) {
        message.success({
          content: 'Đăng ký thành công!',
          className: 'custom-message',
          duration: 3
        })
        onRegisterSuccess(values.email)
      }
    } catch (error) {
      console.error('Register failed:', error)
      message.error({
        content: error.message || 'Đăng ký thất bại. Vui lòng thử lại.',
        className: 'custom-message',
        duration: 3
      })
    }
    setLoading(false)
  }

  return (
    <div className="register-form-container">
      <h2 className="form-title">Đăng Ký</h2>
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: '',
          email: '',
          password: '',
          phone: '',
          address: ''
        }}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input placeholder="Nhập họ và tên của bạn" className="form-input" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập email của bạn" className="form-input" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập số điện thoại" className="form-input" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input placeholder="Nhập địa chỉ của bạn" className="form-input" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" className="form-input" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="register-button"
            block
          >
            Đăng Ký
          </Button>
        </Form.Item>

        <div className="login-link">
          Đã có tài khoản?{' '}
          <a href="/login" className="login-link-text">
            Đăng nhập ngay
          </a>
        </div>
      </Form>
    </div>
  )
}

export default RegisterForm
