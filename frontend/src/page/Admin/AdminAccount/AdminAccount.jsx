import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, message } from 'antd'
import { UserOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUsers,
  getAllUser,
  updateUser
} from '../../../stores/User/userApis'
import UserEdit from './UserEdit'

const AdminAccount = () => {
  const dispatch = useDispatch()
  const usersList = useSelector((state) => state.user.usersList || {})
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  useEffect(() => {
    if (Array.isArray(usersList.users)) {
      setUsers(usersList.users)
    }
  }, [usersList])

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUsers([userId]))
      message.success('Xoá người dùng thành công!')
      dispatch(getAllUser())
    } catch (error) {
      message.error('Xoá thất bại!')
      console.error(error)
    }
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setIsModalVisible(true)
  }

  const handleUpdateUser = async (updatedUser) => {
    const userId = updatedUser.user_id
    try {
      await dispatch(updateUser(userId, updatedUser))
      message.success('Cập nhật thành công!')
      setIsModalVisible(false)
      dispatch(getAllUser())
    } catch (error) {
      message.error('Cập nhật thất bại!')
      console.error(error)
    }
  }

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <b>{text}</b>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) =>
        gender || <i style={{ color: '#999' }}>Chưa cập nhật</i>
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) =>
        dob ? (
          new Date(dob).toLocaleDateString('vi-VN')
        ) : (
          <i style={{ color: '#999' }}>Chưa cập nhật</i>
        )
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) =>
        role === 'admin' ? (
          <Tag color="red">Admin</Tag>
        ) : (
          <Tag color="blue">User</Tag>
        )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<UserOutlined />}
            size="small"
            onClick={() => message.info(`Chi tiết: ${record.name}`)}
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditUser(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteUser(record.user_id)}
          >
            Xoá
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Quản lý người dùng</h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="user_id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      <UserEdit
        visible={isModalVisible}
        userData={editingUser}
        onCancel={() => setIsModalVisible(false)}
        onUpdate={handleUpdateUser}
      />
    </div>
  )
}

export default AdminAccount
