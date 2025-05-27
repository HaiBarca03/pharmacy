import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../../stores/Product/productApis'
import { useParams } from 'react-router-dom'
import { Col, Pagination, Row, Space, Spin } from 'antd'
import CardProduct from '../../components/CardProduct/CardProduct'
import './SearchProduct.css'

const ProductSeach = () => {
  const listSearchProduct = useSelector(
    (state) => state.product.productSearch || {}
  )
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const products = listSearchProduct.products || []
  const dispatch = useDispatch()
  const { keyword } = useParams()

  useEffect(() => {
    setLoading(true)
    dispatch(searchProducts(keyword, page))
  }, [dispatch, keyword, page])

  useEffect(() => {
    if (listSearchProduct.total >= 0) {
      setTotal(listSearchProduct.total)
      setLoading(false)
    }
  }, [listSearchProduct])

  return (
    <div className="homepage-search-products">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="category-header">
          <p className="breadcrumb">
            <a href="/" className="breadcrumb-home">
              Trang chủ
            </a>{' '}
            &raquo;{' '}
            <span className="breadcrumb-category">Sản phẩm cho tìm kiếm</span>
          </p>
          <h2 className="category-title">Sản phẩm cho tìm kiếm: {keyword}</h2>
        </div>
      </Space>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
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
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={page}
              pageSize={12}
              total={total}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductSeach
