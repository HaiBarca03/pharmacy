import React, { useState } from 'react'
import { Input, Button, Form, Card, message } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import './QuestionForm.css'
import { createHelth } from '../../stores/HealthConsultation/HealthConsultationApis'

const { TextArea } = Input

const QuestionForm = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(createHelth(values))
      message.success('Câu hỏi đã được gửi thành công!')
      form.resetFields()
    } catch (error) {
      message.error('Gửi câu hỏi thất bại: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-wrapper">
      <Card
        bordered={false}
        className="question-card"
        title={<h2 className="form-title">🩺 Gửi câu hỏi tư vấn sức khoẻ</h2>}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="question-form"
        >
          <Form.Item
            name="question"
            label="Nội dung câu hỏi"
            rules={[
              { required: true, message: 'Vui lòng nhập nội dung câu hỏi!' }
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Nhập câu hỏi của bạn tại đây..."
              className="custom-textarea"
            />
          </Form.Item>

          <Form.Item className="form-submit">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={loading}
              className="submit-btn"
            >
              Gửi câu hỏi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default QuestionForm
