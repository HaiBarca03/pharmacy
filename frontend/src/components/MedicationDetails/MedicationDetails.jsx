import React, { useEffect, useState } from 'react'
import { Button, Card, Image, InputNumber, Space, Typography } from 'antd'
import './MedicationDetails.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailProducts } from '../../stores/Product/productApis'
import { clearProductDetails } from '../../stores/Product/productSlice'

const { Title, Text } = Typography

const MedicationDetails = () => {
  const { id } = useParams()
  const medication = useSelector((state) => state.product.productDetails || {})
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(
    Array.isArray(medication.image_url) && medication.image_url.length > 0
      ? medication.image_url[0]
      : 'https://via.placeholder.com/300?text=No+Image'
  )

  useEffect(() => {
    dispatch(getDetailProducts(id))
    return () => {
      dispatch(clearProductDetails())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (
      Array.isArray(medication.image_url) &&
      medication.image_url.length > 0
    ) {
      setMainImage(medication.image_url[0])
    }
  }, [medication.image_url])

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl)
  }

  return (
    <div className="medication-details-container">
      <Card className="medication-details-card" bordered={false}>
        <Text className="product-info">
          {medication.code || 'P00591'} - Thương hiệu:{' '}
          {medication.manufacturer || 'DHG Pharma'}
        </Text>

        <div className="product-layout">
          <div className="medication-image">
            <Image
              src={mainImage}
              alt={medication.name || 'Amoxicillin 500mg'}
              fallback="https://via.placeholder.com/300?text=No+Image"
              width={350}
              height={350}
              style={{ objectFit: 'contain' }}
            />
            <div className="thumbnail-container">
              <Space>
                {Array.isArray(medication.image_url) &&
                medication.image_url.length > 0 ? (
                  medication.image_url.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      style={{
                        objectFit: 'contain',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border:
                          mainImage === url
                            ? '2px solid #1890ff'
                            : '1px solid #ddd'
                      }}
                      preview={false}
                      onClick={() => handleThumbnailClick(url)}
                    />
                  ))
                ) : (
                  <Image
                    src="https://via.placeholder.com/60?text=No+Image"
                    alt="Thumbnail"
                    width={60}
                    height={60}
                    style={{
                      objectFit: 'contain',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                    preview={false}
                  />
                )}
              </Space>
            </div>
          </div>
          <div className="product-details">
            <div className="detail-card">
              <div className="detail-item">
                <Text className="name-label" strong>
                  {medication.name || 'Amoxicillin 500mg'}
                </Text>
              </div>
              <div className="detail-item">
                <span className="detail-label">Giá:</span>
                <span className="detail-value price-highlight">
                  {medication.price || '32000'} đ
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tồn kho:</span>
                <span className="detail-value">
                  {medication.stock || '200'} đơn vị
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Dạng thuốc:</span>
                <span className="detail-value">
                  {medication.dosage_form || 'viên nang'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Hoạt chất:</span>
                <span className="detail-value">
                  {Array.isArray(medication.active_ingredients) &&
                  medication.active_ingredients.length > 0
                    ? medication.active_ingredients.join(', ')
                    : 'Không có thông tin'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Danh mục thuốc:</span>
                <span className="detail-value">
                  {medication.Category?.name || 'Không có thông tin'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Yêu cầu kê đơn:</span>
                <span
                  className={`detail-value ${
                    medication.is_prescription
                      ? 'prescription-required'
                      : 'prescription-not-required'
                  }`}
                >
                  {medication.is_prescription ? 'Có' : 'Không'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Ngày hết hạn:</span>
                <span className="detail-value">
                  {medication.expiry_date
                    ? new Date(medication.expiry_date).toLocaleDateString(
                        'vi-VN'
                      )
                    : 'Chưa có thông tin'}
                </span>
              </div>
            </div>
          </div>
          <div className="action-section">
            {/* Quantity Selector */}
            <div className="quantity-container">
              <Text className="quantity-label">Số lượng</Text>
              <Space>
                <Button
                  type="text"
                  icon={<span>-</span>}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                />
                <InputNumber
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  size="large"
                  className="quantity-input"
                />
                <Button
                  type="text"
                  icon={<span>+</span>}
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                />
              </Space>
            </div>

            {/* Action Buttons */}
            <Space className="action-buttons">
              <Button type="primary" size="large" className="buy-now-btn">
                Mua ngay
              </Button>
              <Button size="large" className="add-to-cart-btn">
                Thêm vào giỏ
              </Button>
            </Space>

            {/* Additional Icons */}
            {/* <div className="icon-row">
              <Space size={16}>
                <span className="icon-item">
                  <img
                    src="https://via.placeholder.com/24?text=Đ"
                    alt="Đủ thuốc chuẩn"
                  />
                  <Text className="icon-text">Đủ thuốc chuẩn</Text>
                </span>
                <span className="icon-item">
                  <img
                    src="https://via.placeholder.com/24?text=G"
                    alt="Giao hàng siêu tốc"
                  />
                  <Text className="icon-text">Giao hàng siêu tốc</Text>
                </span>
                <span className="icon-item">
                  <img
                    src="https://via.placeholder.com/24?text=M"
                    alt="Miễn phí vận chuyển"
                  />
                  <Text className="icon-text">Miễn phí vận chuyển</Text>
                </span>
              </Space>
            </div> */}
          </div>
        </div>
        <div className="product-des">
          <Title level={4} className="description-title">
            Mô tả sản phẩm
          </Title>
          {medication.description ? (
            <Text className="description-text">{medication.description}</Text>
          ) : (
            <Text className="description-text">
              Không có mô tả cho sản phẩm này.
            </Text>
          )}
        </div>
      </Card>
    </div>
  )
}

export default MedicationDetails
