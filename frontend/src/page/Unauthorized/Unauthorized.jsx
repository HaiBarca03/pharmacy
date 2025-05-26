import React from 'react'
import { Button, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import 'antd/dist/reset.css'
import './Unauthorized.css'

const { Title, Paragraph } = Typography

const Unauthorized = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <img
          // src="https://media.giphy.com/media/lvQe7YwEEJoaIluvs6/giphy.gif?cid=ecf05e47xi9mea4114bgcro764arywaxph3riz9oyhbsch3u&ep=v1_gifs_related&rid=giphy.gif&ct=g"
          src="https://mona.media/wp-content/uploads/2023/03/loi-401-la-gi.png"
          alt="404 Not Found"
          className="notfound-image"
        />
        <Title level={2} className="notfound-title">
          Oops! Bạn Không Có Quyền Truy Cập
        </Title>
        <Paragraph className="notfound-description">
          Trang bạn đang cố gắng truy cập yêu cầu quyền truy cập mà bạn không
          có. Vui lòng đăng nhập với tài khoản có quyền truy cập hoặc liên hệ
          với quản trị viên để biết thêm chi tiết.
        </Paragraph>
        <Button
          type="primary"
          icon={<HomeOutlined />}
          size="large"
          className="notfound-button"
        >
          <Link to="/">Về Trang Chủ</Link>
        </Button>
      </div>
    </div>
  )
}

export default Unauthorized
