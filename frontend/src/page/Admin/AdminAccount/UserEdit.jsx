import React, { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const UserEdit = ({ visible, onCancel, onUpdate, userData }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData)
    }
  }, [userData, form])

  const handleOk = () => {
    form.validateFields().then((values) => {
      onUpdate({ ...userData, ...values })
    })
  }

  return (
    <Modal
      title="Cập nhật người dùng"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="SĐT" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender">
          <Select allowClear>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
        >
          <Select>
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserEdit
