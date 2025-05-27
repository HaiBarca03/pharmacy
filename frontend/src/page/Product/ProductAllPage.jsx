import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../stores/Product/productApis'
import { Col, Pagination, Row, Space, Spin } from 'antd'
import CardProduct from '../../components/CardProduct/CardProduct'
import '../Search/SearchProduct.css'

const ProductAll = () => {
  const listSearchProduct = useSelector(
    (state) => state.product.productsList || {}
  )
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const products = listSearchProduct.products || []
  console.log('products', products)

  useEffect(() => {
    setLoading(true)
    dispatch(getAllProducts(page, 12))
  }, [dispatch, page])

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
            &raquo; <span className="breadcrumb-category">Tất cả sản phẩm</span>
          </p>
          <h2 className="category-title">Danh sách sản phẩm</h2>
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

export default ProductAll
