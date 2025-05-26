import React, { useState } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { useDispatch } from 'react-redux'
import {
  createHelth,
  getMyHealthConsultation
} from '../../stores/HealthConsultation/HealthConsultationApis'
import './HealthConsultationForm.css'

const { TextArea } = Input

const HealthConsultationForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(createHelth(values))
      await dispatch(getMyHealthConsultation())
      message.success('Gửi câu hỏi thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi câu hỏi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className="health-form-card"
      title={
        <div className="card-title-container">
          <span>Gửi câu hỏi sức khỏe</span>
          <Button size="small" type="default">
            Câu hỏi của tôi
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Câu hỏi"
          name="question"
          rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
        >
          <TextArea
            rows={4}
            placeholder="Mời bạn nhập câu hỏi về sức khỏe của mình"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Gửi câu hỏi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default HealthConsultationForm
