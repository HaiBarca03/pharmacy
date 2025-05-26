import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Input, Button, Space, Menu, Dropdown } from 'antd'
import {
  BellOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../stores/Category/CategoryApis'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const categoryScrollRef = useRef(null)
  const listCaegories = useSelector(
    (state) => state.category.CategoriesList || []
  )
  const storedUser = localStorage.getItem('user')
  useEffect(() => {
    dispatch(getAllCategory())
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [dispatch])
  const handleCategoryClick = (categoryId) => {
    navigate(`/product/category/${categoryId}`)
  }

  const menu = (
    <Menu>
      {listCaegories.map((category) => (
        <Menu.Item
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </Menu.Item>
      ))}
    </Menu>
  )

  const scrollCategories = (direction) => {
    const scrollContainer = categoryScrollRef.current
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      })
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  const handleProfile = () => {
    navigate('/profile')
  }
  const handleHome = () => {
    navigate('/')
  }
  return (
    <div className="header-container">
      <Row align="middle" className="header-row">
        <Col span={4} className="logo">
          <img
            src="https://res.cloudinary.com/dbzuqtojr/image/upload/v1748232240/myphots/1_gwjkyb.png"
            alt="Pharmacity Logo"
            className="logo-image"
            onClick={handleHome}
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
              {user ? (
                <div className="user-info">
                  <div className="avatar-wrapper" onClick={handleProfile}>
                    <img
                      src={
                        user.avatar ||
                        'https://e7.pngegg.com/pngimages/297/49/png-clipart-pharmacy-symbol-aboriginal-text-logo-thumbnail.png'
                      }
                      alt="avatar"
                      className="user-avatar"
                    />
                    <span className="user-name">{user.name}</span>
                  </div>
                  <Button
                    icon={<LogoutOutlined />}
                    className="icon-button"
                    onClick={handleLogout}
                  />
                </div>
              ) : (
                <button className="login-button-btn" onClick={handleLogin}>
                  <UserOutlined /> Đăng nhập/Đăng ký
                </button>
              )}
            </Space>
          </div>
        </Col>
      </Row>
      <Row className="nav-row">
        <Col span={24}>
          <Space size="middle" className="nav-links">
            <Dropdown
              overlay={
                <Menu className="custom-dropdown-menu">
                  <div className="dropdown-grid">
                    {listCaegories.map((category) => (
                      <Menu.Item
                        key={category.id}
                        onClick={() =>
                          navigate(`/product/category/${category.id}`)
                        }
                      >
                        {category.name}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="link" className="category-dropdown-button">
                <MenuUnfoldOutlined />
                Danh mục
              </Button>
            </Dropdown>

            <div className="category-scroll-wrapper">
              <Button
                className="scroll-button"
                icon={<DoubleLeftOutlined />}
                onClick={() => scrollCategories('left')}
              />
              <div className="category-scroll" ref={categoryScrollRef}>
                {listCaegories.map((category) => (
                  <Button
                    key={category.id}
                    type="link"
                    onClick={() => navigate(`/product/category/${category.id}`)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              <Button
                className="scroll-button"
                icon={<DoubleRightOutlined />}
                onClick={() => scrollCategories('right')}
              />
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default Header
