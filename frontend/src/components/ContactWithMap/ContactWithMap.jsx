import React from 'react'
import { Card, Typography } from 'antd'
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined
} from '@ant-design/icons'
import './ContactWithMap.css'

const { Title, Paragraph } = Typography

const ContactWithMap = () => {
  return (
    <div className="contact-container">
      {/* Thông tin liên hệ */}
      <Card className="contact-card" bordered={false}>
        <Title level={3}>Liên hệ với chúng tôi</Title>
        <Paragraph>
          <EnvironmentOutlined /> Địa chỉ: Hải Dương, Việt Nam
        </Paragraph>
        <Paragraph>
          <PhoneOutlined /> SĐT: 0394 558 656
        </Paragraph>
        <Paragraph>
          <MailOutlined /> Email: haidoan08022003@gmail.com
        </Paragraph>
        <Paragraph>
          <FacebookOutlined /> Facebook:{' '}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Doan Duc Hai
          </a>
        </Paragraph>
      </Card>

      {/* Bản đồ */}
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6410538367596!2d105.84117191531361!3d21.005256393965303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8c3fbb9451%3A0xc9e3f8f56e95d3dc!2zSG_DoGkgRGnhu4VuZw!5e0!3m2!1svi!2s!4v1623309243670!5m2!1svi!2s"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default ContactWithMap
