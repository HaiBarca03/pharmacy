import { Col, Row, Space, Spin, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProduct from '../../components/CardProduct/CardProduct'
import {
  getDetailCategory,
  getProductCategory
} from '../../stores/Category/CategoryApis'
import { useParams } from 'react-router-dom'
import './ProductCategory.css'

const ProductCategory = () => {
  const listProduct = useSelector(
    (state) => state.category.CateListProducts || {}
  )
  const detailCate = useSelector(
    (state) => state.category.CategoriesDetail || {}
  )
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const { id } = useParams()

  const products = listProduct.products || []
  const total = listProduct.total || 0
  const limit = listProduct.limit || 10

  useEffect(() => {
    dispatch(getProductCategory(id, currentPage, limit))
    dispatch(getDetailCategory(id))
  }, [dispatch, id, currentPage])

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false)
    }
  }, [products])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setLoading(true)
  }

  return (
    <div className="category-products">
      <div className="category-header">
        <p className="breadcrumb">
          <a href="/" className="breadcrumb-home">
            Trang chủ
          </a>{' '}
          &raquo; <span className="breadcrumb-category">{detailCate.name}</span>
        </p>
        <h2 className="category-title">{detailCate.name}</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="no-products">
              <p>
                Danh mục <strong>{detailCate.name}</strong> hiện tại chưa có
                thuốc.
              </p>
            </div>
          ) : (
            <>
              <Row gutter={[16, 16]} className="category-grid">
                {products.map((product) => (
                  <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                    key={product.id}
                    className="category-col"
                  >
                    <CardProduct product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={limit}
              total={total}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductCategory
