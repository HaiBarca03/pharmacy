import React from 'react'
import { Form, Input, Button, Typography, message, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import 'antd/dist/reset.css' // Ant Design styles
import './Login.css' // Custom styles
import { loginUser } from '../../stores/User/userApis'

const { Title } = Typography

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      await dispatch(loginUser(values))
      message.success('Đăng nhập thành công!')
      const storedUser = localStorage.getItem('user')
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.isAdmin === true || parsedUser.role === 'admin') {
        setTimeout(() => {
          navigate('/admin')
        }, 100)
      } else {
        navigate('/')
      }
    } catch (error) {
      message.error(error.message || 'Đăng nhập thất bại')
    }
  }

  // const handleGoogleLogin = () => {
  //   window.location.href = 'https://managemyphotos.onrender.com/auth/google'
  // }

  // const handleFacebookLogin = () => {
  //   window.location.href = 'https://managemyphotos.onrender.com/auth/facebook'
  // }

  return (
    <div className="login-container">
      <Form
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2} className="form-title">
          Đăng Nhập
        </Title>

        <Form.Item
          name="identifier"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Email hoặc số điện thoại!'
            },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email hoăc Số điện thoại"
            className="form-input"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
            className="form-input"
          />
        </Form.Item>

        <Form.Item>
          <a href="/forgot-password" className="forgot-password">
            Quên mật khẩu?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            block
          >
            Đăng Nhập
          </Button>
        </Form.Item>

        <Divider plain>Hoặc</Divider>

        <Form.Item>
          <Button
            icon={<FcGoogle size={20} />}
            // onClick={handleGoogleLogin}
            className="social-button google-button"
            block
          >
            Đăng nhập với Google
          </Button>
          <Button
            icon={<FaFacebook size={20} />}
            // onClick={handleFacebookLogin}
            className="social-button facebook-button"
            block
          >
            Đăng nhập với Facebook
          </Button>
        </Form.Item>

        <div className="register-link">
          Bạn chưa có tài khoản?{' '}
          <a href="/register" className="register-link-text">
            Đăng ký ngay
          </a>
        </div>
      </Form>
    </div>
  )
}

export default Login
