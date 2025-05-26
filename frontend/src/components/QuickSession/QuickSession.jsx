import { Button, Space } from 'antd'
import React from 'react'
import {
  QuestionCircleOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  FireOutlined,
  DollarOutlined,
  CalendarOutlined,
  PhoneOutlined,
  TeamOutlined,
  TagOutlined,
  SmileOutlined
} from '@ant-design/icons'
import './QuickSession.css'
import { useNavigate } from 'react-router-dom'

const QuickSession = () => {
  const navigate = useNavigate()
  const handleArticles = () => {
    navigate('/article')
  }
  const handleHelthConsultation = () => {
    navigate('/health-consultation')
  }
  return (
    <Space size="large" wrap>
      <Button
        className="category-button"
        icon={<QuestionCircleOutlined />}
        onClick={handleHelthConsultation}
      >
        Tư vấn
      </Button>
      <Button className="category-button" icon={<MedicineBoxOutlined />}>
        Danh mục
      </Button>
      <Button
        className="category-button"
        icon={<TagOutlined />}
        onClick={handleArticles}
      >
        Bài viết
      </Button>
      <Button className="category-button" icon={<TeamOutlined />}>
        Hỗ trợ sức khỏe
      </Button>
      <Button className="category-button" icon={<ShoppingCartOutlined />}>
        Giỏ hàng
      </Button>
      <Button className="category-button" icon={<SmileOutlined />}>
        Liên hệ
      </Button>
      <Button className="category-button hot-button" icon={<PhoneOutlined />}>
        Phòng Covid-19 HOT
      </Button>
    </Space>
  )
}

export default QuickSession
