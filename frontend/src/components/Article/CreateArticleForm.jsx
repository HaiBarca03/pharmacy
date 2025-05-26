import React, { useState } from 'react'
import { Form, Input, Button, Card, message, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { createArticle, getAllArticle } from '../../stores/Article/ArticleApis'
import './CreateArticleForm.css'

const { TextArea } = Input

const CreateArticleForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(createArticle(values))
      await dispatch(getAllArticle())
      message.success('Tạo bài viết thành công!')
    } catch (error) {
      message.error('Đã xảy ra lỗi khi tạo bài viết.')
    } finally {
      setLoading(false)
    }
  }

  const handleMyArticlesClick = () => {
    message.info('Chức năng "Bài viết của tôi" đang được phát triển!')
    // Hoặc redirect: navigate('/my-articles') nếu bạn có route
  }

  return (
    <Card
      className="create-article-card"
      title={
        <div className="card-title-container">
          <span>Tạo bài viết mới</span>
          <Button type="default" onClick={handleMyArticlesClick} size="small">
            Bài viết của tôi
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <TextArea rows={5} placeholder="Nhập nội dung bài viết" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng bài
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateArticleForm
