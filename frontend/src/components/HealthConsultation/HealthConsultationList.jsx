import React from 'react'
import { useSelector } from 'react-redux'
import { Card, List, Typography } from 'antd'

const HealthConsultationList = () => {
  const consultations = useSelector(
    (state) => state.healthConsultation.MyHealthConsultation || []
  )

  return (
    <Card title="Danh sách hỏi đáp của tôi" className="health-list-card">
      <List
        dataSource={consultations}
        renderItem={(item) => (
          <List.Item>
            <div style={{ width: '100%' }}>
              <Typography.Text strong>Câu hỏi:</Typography.Text> {item.question}
              <br />
              <Typography.Text type="secondary">
                Trả lời: {item.answer || 'Chưa có phản hồi'}
              </Typography.Text>
            </div>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default HealthConsultationList
