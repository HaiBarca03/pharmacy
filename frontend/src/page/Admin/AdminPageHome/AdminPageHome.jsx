import React, { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import {
  FileTextOutlined,
  CommentOutlined,
  UserOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import './AdminPageHome.css'
import { useNavigate } from 'react-router-dom'
import AdminCategory from '../AdminCategory/AdminCategory'
import AdminAccount from '../AdminAccount/AdminAccount'
import AdminArticle from '../AdminArticle/AdminArticle'
import AdminHealthConsultation from '../AdminHealthConsultation/AdminHealthConsultation'
import AdminProduct from '../AdminProduct/AdminProduct'
import AdminOrder from '../AdminOrder/AdminOrder'
const { Header, Sider, Content } = Layout

const AdminPageHome = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('articles')
  const user = JSON.parse(localStorage.getItem('user'))
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }
  const renderContent = () => {
    switch (selectedKey) {
      case 'articles':
        return <AdminArticle />
      case 'health':
        return <AdminHealthConsultation />
      case 'users':
        return <AdminAccount />
      case 'products':
        return <AdminProduct />
      case 'orders':
        return <AdminOrder />
      case 'categories':
        return <AdminCategory />
      case 'logout':
        navigate('/')
        return null
      case 'homepage':
        navigate('/')
      default:
        return <h2>Chào mừng đến trang Admin</h2>
    }
  }
  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="ad-logo">{user.name}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['articles']}
          onClick={(e) => setSelectedKey(e.key)}
        >
          <Menu.Item key="homepage" icon={<FileTextOutlined />}>
            Trang chủ
          </Menu.Item>
          <Menu.Item key="articles" icon={<FileTextOutlined />}>
            Bài viết
          </Menu.Item>
          <Menu.Item key="health" icon={<CommentOutlined />}>
            Hỏi đáp
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            Người dùng
          </Menu.Item>
          <Menu.Item key="products" icon={<AppstoreOutlined />}>
            Sản phẩm
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingOutlined />}>
            Đơn hàng
          </Menu.Item>
          <Menu.Item key="categories" icon={<UnorderedListOutlined />}>
            Danh mục
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="admin-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '18px', width: 48, height: 48 }}
          />
          <h1>Admin Dashboard</h1>
        </Header>
        <Content className="admin-content">{renderContent()}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminPageHome
