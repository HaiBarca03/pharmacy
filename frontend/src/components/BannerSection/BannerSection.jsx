import React from 'react'
import { Row, Col, Carousel, Image } from 'antd'

const BannerSection = () => {
  return (
    <div className="banner-section" style={{ padding: '20px' }}>
      <Row gutter={16}>
        {/* Banner Slide bên trái */}
        <Col xs={24} md={16}>
          <Carousel autoplay dots={false} effect="scrollx">
            <div>
              <Image
                src="https://production-cdn.pharmacity.io/digital/795x0/plain/e-com/images/banners/20250507071722-0-banner_Desktop.png?versionId=pcJUWwUCfuPX_tnTRgj366qgzPZqsYnY"
                alt="banner1"
                width="100%"
                preview={false}
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div>
              <Image
                src="https://production-cdn.pharmacity.io/digital/795x0/plain/e-com/images/banners/20240731045253-0-Slide%20banner%201.png"
                alt="banner2"
                width="100%"
                preview={false}
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div>
              <Image
                src="https://production-cdn.pharmacity.io/digital/795x0/plain/e-com/images/banners/20250418045421-0-goiqua_2025_1590x604.webp?versionId=jGVu5vWRCypnbCnq7Bh4x4qADhdMU2Br"
                alt="banner3"
                width="100%"
                preview={false}
                style={{ borderRadius: '10px' }}
              />
            </div>
          </Carousel>
        </Col>

        {/* 2 banner nhỏ bên phải */}
        <Col xs={24} md={8}>
          <div style={{ marginBottom: '16px' }}>
            <Image
              src="https://production-cdn.pharmacity.io/digital/389x0/plain/e-com/images/banners/20250424094315-0-SubSayhi.png?versionId=.6qNYJtNcKkprTn2r5eXNcSFu3S9Usa2"
              alt="banner right 1"
              width="100%"
              preview={false}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div>
            <Image
              src="https://production-cdn.pharmacity.io/digital/795x0/plain/e-com/images/banners/20250423070942-0-1590x604-.png?versionId=sDSzpSAJhFHA0DAd9tma_HdTU.CQQ_ux"
              alt="banner right 2"
              width="100%"
              preview={false}
              style={{ borderRadius: '10px' }}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BannerSection
