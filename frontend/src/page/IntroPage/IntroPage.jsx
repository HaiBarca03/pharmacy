import React from 'react'
import './IntroPage.css'
import {
  CheckCircleOutlined,
  SmileOutlined,
  RocketOutlined,
  StarOutlined
} from '@ant-design/icons'

const IntroPage = () => {
  return (
    <div className="intro-container">
      <h1 className="intro-title">DoanTienPharmacy</h1>
      <p className="intro-subtitle">Chuỗi nhà thuốc uy tín hàng đầu Việt Nam</p>

      <div className="intro-section">
        <CheckCircleOutlined className="intro-icon" />
        <div className="intro-text">
          <h3>Sản phẩm chính hãng</h3>
          <p>
            Cung cấp thuốc và sản phẩm chăm sóc sức khỏe từ các thương hiệu uy
            tín như Pfizer, GSK, Abbott, Dược Hậu Giang...
          </p>
        </div>
      </div>

      <div className="intro-section">
        <SmileOutlined className="intro-icon" />
        <div className="intro-text">
          <h3>Dược sĩ tư vấn tận tâm</h3>
          <p>
            Đội ngũ dược sĩ chuyên môn cao, luôn hỗ trợ khách hàng sử dụng thuốc
            an toàn, hiệu quả.
          </p>
        </div>
      </div>

      <div className="intro-section">
        <RocketOutlined className="intro-icon" />
        <div className="intro-text">
          <h3>Mua sắm tiện lợi</h3>
          <p>
            Giao hàng nhanh 2 giờ tại thành phố lớn, hỗ trợ mua tại nhà thuốc và
            online trên website/app.
          </p>
        </div>
      </div>

      <div className="intro-section">
        <StarOutlined className="intro-icon" />
        <div className="intro-text">
          <h3>Ưu đãi thành viên</h3>
          <p>
            Tích điểm, nhận khuyến mãi và đặc quyền dành riêng cho khách hàng
            thân thiết.
          </p>
        </div>
      </div>
    </div>
  )
}

export default IntroPage
