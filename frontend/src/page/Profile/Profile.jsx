import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Typography,
  Button,
  Descriptions,
  Avatar,
  Divider,
  Row,
  Col
} from 'antd'
import {
  EditOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ManOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { getUserProfile } from '../../stores/User/userApis'
import './Profile.css'

const { Title, Text } = Typography

const Profile = () => {
  const profile = useSelector((state) => state.user.profile || {})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  const handleEdit = () => {
    navigate('/profile/edit')
  }

  return (
    <div className="profile-container">
      <Card className="profile-card shadow-lg">
        <Row gutter={32}>
          <Col xs={24} md={8} className="text-center">
            <Avatar
              size={150}
              src="https://i.pinimg.com/originals/21/5e/c4/215ec43211a20eae7e68d9ad60d9c1f6.jpg"
              icon={<UserOutlined />}
            />
            <Title level={3} style={{ marginTop: 16 }}>
              {profile.name || 'Chưa cập nhật'}
            </Title>
            <Text type="secondary">
              {profile.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
            </Text>
            <br />
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
              style={{ marginTop: 20 }}
            >
              Chỉnh sửa hồ sơ
            </Button>
          </Col>

          <Col xs={24} md={16}>
            <Divider orientation="left">Thông tin chi tiết</Divider>
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item
                label={
                  <>
                    <MailOutlined /> Email
                  </>
                }
              >
                {profile.email || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <PhoneOutlined /> Số điện thoại
                  </>
                }
              >
                {profile.phone || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <ManOutlined /> Giới tính
                  </>
                }
              >
                {profile.gender || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined /> Ngày sinh
                  </>
                }
              >
                {profile.dob || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <EnvironmentOutlined /> Địa chỉ
                  </>
                }
              >
                {profile.address || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo tài khoản">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleString()
                  : 'Chưa cập nhật'}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Profile
