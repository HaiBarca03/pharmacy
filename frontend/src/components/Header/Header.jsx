import React from 'react'
import { Row, Col, Input, Button, Space, Menu, Dropdown } from 'antd'
import {
  BellOutlined,
  DoubleRightOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const menu = (
    <Menu>
      <Menu.Item key="1">Danh mục 1</Menu.Item>
      <Menu.Item key="2">Danh mục 2</Menu.Item>
      <Menu.Item key="3">Danh mục 3</Menu.Item>
      <Menu.Item key="4">Danh mục 4</Menu.Item>
    </Menu>
  )
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <div className="header-container">
      <Row align="middle" className="header-row">
        <Col span={4} className="logo">
          <img
            src="https://prod-cdn.pharmacity.io/e-com/images/static-website/pharmacity-logo.svg"
            alt="Pharmacity Logo"
            className="logo-image"
          />
        </Col>
        <Col span={14}>
          <Input
            placeholder="Bạn đang tìm gì hôm nay..."
            prefix={<SearchOutlined />}
            className="search-bar"
          />
        </Col>
        <Col span={6} className="header-actions">
          <div className="user-actions-container">
            <Space size="middle">
              <Button icon={<BellOutlined />} className="icon-button" />
              <Button icon={<ShoppingCartOutlined />} className="icon-button" />
              <Button className="login-button" onClick={() => handleLogin()}>
                <UserOutlined /> Đăng nhập/Đăng ký
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      <Row className="nav-row">
        <Col span={24}>
          <Space size="middle" className="nav-links">
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button type="link">
                Danh mục <DoubleRightOutlined style={{ fontSize: 11 }} />
              </Button>
            </Dropdown>
            <div className="category-scroll">
              <Button type="link">Thuốc</Button>
              <Button type="link">Tra cứu bệnh</Button>
              <Button type="link">Thực phẩm bảo vệ sức khỏe</Button>
              <Button type="link">Mẹ và bé</Button>
              <Button type="link">Nhắn hàng Pharmacity</Button>
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default Header
