import { useState } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import RegisterForm from './Register'
import 'antd/dist/reset.css'
import './RegisterPage.css'

const RegisterPage = () => {
  const navigate = useNavigate()

  const handleRegisterSuccess = () => {
    message.info({
      content: 'Đăng ký thành công!',
      className: 'custom-message',
      duration: 2
    })

    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="register-page-container">
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  )
}

export default RegisterPage
