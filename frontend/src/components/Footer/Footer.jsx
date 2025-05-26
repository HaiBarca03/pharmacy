import React from 'react'
import { Layout, Row, Col, Typography, Space, Divider } from 'antd'
import {
  FacebookOutlined,
  YoutubeOutlined,
  QrcodeOutlined,
  AppleOutlined,
  AndroidOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import './AppFooter.css'

const { Footer } = Layout
const { Title, Text, Link } = Typography

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <div className="footer-content">
        <Row gutter={[32, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={5}>Về Pharmacy</Title>
            <Space direction="vertical">
              <Link>Giới thiệu</Link>
              <Link>Hệ thống cửa hàng</Link>
              <Link>Giấy phép kinh doanh</Link>
              <Link>Chính sách đổi trả và bảo hành</Link>
              <Link>Chính sách giao hàng</Link>
              <Link>Chính sách bảo mật</Link>
              <Link>Chính sách thanh toán</Link>
              <Link>Thẻ thành viên</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5}>Danh mục</Title>
            <Space direction="vertical">
              <Link>Thuốc</Link>
              <Link>Chăm sóc cá nhân</Link>
              <Link>Mẹ và bé</Link>
              <Link>Thực phẩm chức năng</Link>
              <Link>Thiết bị y tế</Link>
              <Link>Chăm sóc sắc đẹp</Link>
              <Link>Sản phẩm tiện lợi</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5}>Tổng đài miễn cước</Title>
            <Text strong>1800 6821</Text>
            <Text> (Nhánh 1 - Đặt hàng)</Text>
            <br />
            <Text strong>1800 6821</Text>
            <Text> (Nhánh 2 - Thông tin thuốc)</Text>
            <br />
            <Text strong>1800 6821</Text>
            <Text> (Nhánh 2 - Khiếu nại)</Text>

            <Divider className="footer-divider" />

            <Text strong>Ngôn ngữ: </Text>
            <Text>
              <span role="img" aria-label="flag">
                🇻🇳
              </span>{' '}
              Tiếng Việt
            </Text>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5}>Theo dõi chúng tôi</Title>
            <Space className="footer-social-icons" size="middle">
              <FacebookOutlined className="facebook" />
              <YoutubeOutlined className="youtube" />
              <GlobalOutlined className="global" />
            </Space>

            <Divider className="footer-divider" />

            <Title level={5}>Tải ứng dụng Pharmacy</Title>
            <Space className="footer-app-icons" size="middle">
              <QrcodeOutlined />
              <AppleOutlined />
              <AndroidOutlined />
            </Space>
          </Col>
        </Row>

        <Divider />

        <Row justify="space-between">
          <Col>
            <Text>
              Công Ty Cổ Phần Dược Phẩm Pharmacy - 248A Nơ Trang Long, Bình
              Thạnh, TP.HCM | ĐT: 1800 6821 | Email: cskh@pharmacy.vn
            </Text>
          </Col>
          <Col>
            <Space className="footer-payment">
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="visa"
              />
              <img
                src="https://img.icons8.com/color/48/000000/mastercard.png"
                alt="mastercard"
              />
              <img
                src="https://img.icons8.com/color/48/000000/paypal.png"
                alt="paypal"
              />
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  )
}

export default AppFooter
