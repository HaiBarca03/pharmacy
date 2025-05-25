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

const QuickSession = () => {
  return (
    <Space size="large" wrap>
      <Button className="category-button" icon={<QuestionCircleOutlined />}>
        Tư vấn
      </Button>
      <Button className="category-button" icon={<MedicineBoxOutlined />}>
        Danh mục
      </Button>
      <Button className="category-button" icon={<TagOutlined />}>
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
