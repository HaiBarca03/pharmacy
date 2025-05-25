import React, { useEffect, useState } from 'react'
import './HomePage.css'
import { Card, Row, Col, Space, Button, Spin } from 'antd'
import BannerSection from '../../components/BannerSection/BannerSection'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../stores/Product/productApis'
import CardProduct from '../../components/CardProduct/CardProduct'
import QuickSession from '../../components/QuickSession/QuickSession'

const HomePage = () => {
  const listProduct = useSelector((state) => state.product.productsList || {})
  const [loading, setLoading] = useState(true)
  const products = listProduct.products || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false)
    }
  }, [products])

  return (
    <div className="homepage-container">
      <div>
        <BannerSection />
      </div>
      <div className="category-icons-container">
        <QuickSession />
      </div>
      <div className="homepage-all-products">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <h2 className="homepage-title">Sản phẩm mới nhất</h2>
        </Space>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]} className="product-grid">
            {products.map((product) => (
              <Col
                xs={24}
                sm={12}
                md={4}
                lg={4}
                key={product.id}
                className="product-col"
              >
                <CardProduct product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
      <div>
        <p className="homepage-more">Xem tất cả</p>
      </div>
    </div>
  )
}

export default HomePage
