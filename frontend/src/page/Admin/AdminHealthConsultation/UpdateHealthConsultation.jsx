import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { updateHelth } from '../../../stores/HealthConsultation/HealthConsultationApis'

const { Text, Paragraph } = Typography

const UpdateHealthConsultation = ({ consultation, visible, onClose }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (visible && consultation) {
      form.setFieldsValue({
        answer: consultation.answer || ''
      })
    }
  }, [visible, consultation, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      await dispatch(updateHelth(consultation.id, { answer: values.answer }))
      setLoading(false)
      form.resetFields()
      onClose()
    } catch (error) {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Cập nhật câu trả lời"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Huỷ"
      width={600}
    >
      {consultation && (
        <>
          <Paragraph>
            <Text strong>Tên người hỏi: </Text>{' '}
            {consultation.User?.name || 'N/A'}
          </Paragraph>
          <Paragraph>
            <Text strong>Email: </Text> {consultation.User?.email || 'N/A'}
          </Paragraph>
          <Paragraph>
            <Text strong>Câu hỏi: </Text> {consultation.question}
          </Paragraph>
        </>
      )}

      <Form form={form} layout="vertical" name="update-answer-form">
        <Form.Item
          name="answer"
          label="Câu trả lời"
          rules={[{ required: true, message: 'Vui lòng nhập câu trả lời!' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập câu trả lời..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateHealthConsultation
