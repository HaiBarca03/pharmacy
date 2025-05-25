import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Select, DatePicker, Button, Card, Typography } from 'antd'
import { updateUser } from '../../stores/User/userApis'
import './UpdateProfile.css'

const { Title } = Typography
const { Option } = Select

const UpdateProfile = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector((state) => state.user.profile || {})

  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    gender: profile.gender || '',
    dob: profile.dob || '',
    address: profile.address || ''
  })

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateUser(profile.user_id, values))
      navigate('/profile')
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  return (
    <div className="update-profile-container">
      <Card
        title={<Title level={2}>Cập nhật thông tin cá nhân</Title>}
        className="update-profile-card"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onFinish={handleSubmit}
          className="update-profile-form"
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Select placeholder="-- Chọn giới tính --">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngày sinh" name="dob">
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Chọn ngày sinh"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input.TextArea placeholder="Nhập địa chỉ" rows={4} />
          </Form.Item>
          <Form.Item>
            <div className="form-buttons">
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Lưu thay đổi
              </Button>
              <Button
                htmlType="button"
                onClick={() => navigate('/profile')}
                className="cancel-button"
              >
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default UpdateProfile
