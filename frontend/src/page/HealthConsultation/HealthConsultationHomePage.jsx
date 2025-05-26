import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { getMyHealthConsultation } from '../../stores/HealthConsultation/HealthConsultationApis'
import HealthConsultationForm from '../../components/HealthConsultation/HealthConsultationForm'
import HealthConsultationList from '../../components/HealthConsultation/HealthConsultationList'
import './HealthConsultationHomePage.css'

const HealthConsultationHomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyHealthConsultation())
  }, [dispatch])

  return (
    <div className="health-page-container">
      <div className="category-header">
        <p className="breadcrumb">
          <a href="/" className="breadcrumb-home">
            Trang chủ
          </a>{' '}
          &raquo;{' '}
          <span className="breadcrumb-category">Hỏi - đáp sức khoẻ</span>
        </p>
        <h2 className="category-title">Hỏi - đáp sức khoẻ</h2>
      </div>
      <Row gutter={16}>
        <Col span={14}>
          <HealthConsultationList />
        </Col>
        <Col span={10}>
          <HealthConsultationForm />
        </Col>
      </Row>
    </div>
  )
}

export default HealthConsultationHomePage
