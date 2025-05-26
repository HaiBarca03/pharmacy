import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './AdminCategory.css'
import {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../../stores/Category/CategoryApis'

const AdminCategory = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.CategoriesList || [])
  const [openModal, setOpenModal] = useState(false)
  const [form] = Form.useForm()
  const [editCategory, setEditCategory] = useState(null)

  useEffect(() => {
    dispatch(getAllCategory())
  }, [dispatch])

  const handleAdd = () => {
    setEditCategory(null)
    form.resetFields()
    setOpenModal(true)
  }

  const handleEdit = (record) => {
    setEditCategory(record)
    form.setFieldsValue(record)
    setOpenModal(true)
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
    message.success('Xoá thành công!')
  }

  const handleSubmit = (values) => {
    if (editCategory) {
      dispatch(updateCategory(editCategory.id, values))
      message.success('Cập nhật thành công!')
    } else {
      dispatch(createCategory(values))
      message.success('Tạo mới thành công!')
    }
    setOpenModal(false)
  }

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
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
    <div className="admin-category-container">
      <div className="header">
        <h2>Quản lý danh mục</h2>
        <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
          Thêm danh mục
        </Button>
      </div>
      <Table dataSource={categories} columns={columns} rowKey="id" />

      <Modal
        title={editCategory ? 'Cập nhật danh mục' : 'Thêm danh mục'}
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText={editCategory ? 'Cập nhật' : 'Tạo mới'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder="Nhập tên danh mục..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminCategory
