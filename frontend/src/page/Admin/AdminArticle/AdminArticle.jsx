import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Space, message } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  getAllArticle,
  deleteArticle
} from '../../../stores/Article/ArticleApis'
import ArticleViewModal from './ArticleView'

const AdminArticle = () => {
  const dispatch = useDispatch()
  const articleList = useSelector((state) => state.article.articleList || {})
  const articles = articleList.articles || []

  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    dispatch(getAllArticle())
  }, [dispatch])

  const handleDelete = async (articleId) => {
    try {
      await dispatch(deleteArticle(articleId))
      message.success('Xoá bài viết thành công!')
      dispatch(getAllArticle()) // reload lại danh sách
    } catch (error) {
      message.error('Xoá thất bại!')
      console.error(error)
    }
  }

  const handleViews = (articleId) => {
    const article = articles.find((item) => item.id === articleId)
    if (article) {
      setSelectedArticle(article)
      setViewModalVisible(true)
    } else {
      message.error('Không tìm thấy bài viết')
    }
  }

  const handleCloseModal = () => {
    setViewModalVisible(false)
    setSelectedArticle(null)
  }

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <b>{text}</b>
    },
    {
      title: 'Tác giả',
      key: 'author',
      render: (_, record) => record.User?.name || <i>Không rõ</i>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViews(record.id)}
          >
            Xem
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            Xoá
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Quản lý bài viết</h2>
      <Table
        columns={columns}
        dataSource={articles}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      <ArticleViewModal
        visible={viewModalVisible}
        article={selectedArticle}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default AdminArticle
