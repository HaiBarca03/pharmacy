import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  Tag,
  Statistic,
  Row,
  Col,
  Card,
  Space,
  Button,
  Modal,
  message,
  Popconfirm
} from 'antd'
import {
  deleteHelth,
  getHealthConsultation
} from '../../../stores/HealthConsultation/HealthConsultationApis'
import UpdateHealthConsultation from './UpdateHealthConsultation'
import { DeleteOutlined } from '@ant-design/icons'

const AdminHealthConsultation = ({ userId }) => {
  const dispatch = useDispatch()

  const consultations = useSelector(
    (state) => state.healthConsultation.HealthConsultationsList || []
  )
  const loading = useSelector((state) => state.healthConsultation.loading)
  const listConsultations = consultations.consultations || []

  useEffect(() => {
    dispatch(getHealthConsultation())
  }, [dispatch, userId])

  const totalQuestions = listConsultations.length
  const answeredCount = listConsultations.filter((c) => c.answer).length
  const unansweredCount = totalQuestions - answeredCount

  // State để quản lý modal View và Update
  const [viewModalVisible, setViewModalVisible] = React.useState(false)
  const [updateModalVisible, setUpdateModalVisible] = React.useState(false)
  const [selectedRecord, setSelectedRecord] = React.useState(null)

  const showViewModal = (record) => {
    setSelectedRecord(record)
    setViewModalVisible(true)
  }

  const showUpdateModal = (record) => {
    setSelectedRecord(record)
    setUpdateModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteHelth(id))
      message.success('Xoá thành công')
      dispatch(getHealthConsultation())
    } catch (error) {
      message.error('Xoá thất bại')
    }
  }

  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
      render: (text) => <b>{text}</b>
    },
    {
      title: 'Trả lời',
      dataIndex: 'answer',
      key: 'answer',
      render: (answer) =>
        answer ? (
          <Tag color="green">Đã trả lời</Tag>
        ) : (
          <Tag color="orange">Chưa trả lời</Tag>
        )
    },
    {
      title: 'Người hỏi',
      key: 'user',
      render: (_, record) => record.User?.name || <i>Không rõ</i>
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'submitted_at',
      key: 'submitted_at',
      render: (date) => new Date(date).toLocaleString()
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showViewModal(record)}>
            View
          </Button>
          <Button type="primary" onClick={() => showUpdateModal(record)}>
            Trả lời
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Dashboard Tư Vấn Sức Khỏe</h2>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng câu hỏi" value={totalQuestions} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Đã trả lời"
              value={answeredCount}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Chưa trả lời"
              value={unansweredCount}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={listConsultations}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      {/* Modal xem chi tiết */}
      <Modal
        title="Chi tiết câu hỏi"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <>
            <p>
              <b>Câu hỏi:</b> {selectedRecord.question}
            </p>
            <p>
              <b>Trả lời:</b> {selectedRecord.answer || <i>Chưa có trả lời</i>}
            </p>
            <p>
              <b>Người hỏi:</b> {selectedRecord.User?.name || 'Không rõ'}
            </p>
            <p>
              <b>Ngày gửi:</b>{' '}
              {new Date(selectedRecord.submitted_at).toLocaleString()}
            </p>
          </>
        )}
      </Modal>

      {selectedRecord && (
        <UpdateHealthConsultation
          consultation={selectedRecord}
          visible={updateModalVisible}
          onClose={() => {
            setUpdateModalVisible(false)
            dispatch(getHealthConsultation())
          }}
        />
      )}
    </div>
  )
}

export default AdminHealthConsultation
