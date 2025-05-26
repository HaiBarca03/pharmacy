import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Image, Tag, Modal, Popconfirm } from 'antd'
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct
} from '../../../stores/Product/productApis'
import CreateProductModal from './CreateProduct'
import UpdateProduct from './UpdateProduct'

const AdminProduct = () => {
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const dispatch = useDispatch()
  const listProduct = useSelector((state) => state.product.productsList || {})
  const products = listProduct.products || []
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)

  useEffect(() => {
    dispatch(getAllProducts(page, pageSize))
  }, [dispatch, page, pageSize])

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false)
    }
  }, [products])

  const handleView = (product) => {
    setSelectedProduct(product)
    setViewModalVisible(true)
  }

  const handleCloseModal = () => {
    setViewModalVisible(false)
    setSelectedProduct(null)
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id))
      message.success('Xoá thành công')
      dispatch(getAllProducts())
    } catch (error) {
      message.error('Xoá thất bại')
    }
  }

  const handleCreate = (newProduct) => {
    console.log('Tạo sản phẩm mới:', newProduct)
    dispatch(createProduct(newProduct))
    setCreateModalVisible(false)
    dispatch(getAllProducts())
  }
  const handleUpdate = (product) => {
    setSelectedProduct(product)
    setUpdateModalVisible(true)
  }

  const handleUpdateSubmit = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct))
    setUpdateModalVisible(false)
    dispatch(getAllProducts(page, pageSize))
  }

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (images) => (
        <Image
          src={images?.[0]}
          width={50}
          height={50}
          style={{ objectFit: 'cover' }}
          alt="Ảnh sản phẩm"
        />
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <b>{text}</b>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${Number(price).toLocaleString()}₫`
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock'
    },
    {
      title: 'Kê đơn',
      dataIndex: 'is_prescription',
      key: 'is_prescription',
      render: (val) => (
        <Tag color={val ? 'red' : 'green'}>
          {val ? 'Cần kê đơn' : 'Không kê đơn'}
        </Tag>
      )
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
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Button
            type="default"
            size="small"
            onClick={() => handleUpdate(record)}
          >
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
    <div style={{ padding: 24 }}>
      <div className="d-flex justify-between items-center mb-4">
        <h2>Quản lý sản phẩm</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: listProduct.total || 0, // total lấy từ backend trả về tổng số sản phẩm
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }
        }}
        bordered
      />

      <Modal
        open={viewModalVisible}
        title="Chi tiết sản phẩm"
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedProduct && (
          <div>
            <Image
              src={selectedProduct.image_url?.[0]}
              alt="Ảnh"
              width={100}
              style={{ marginBottom: 10 }}
            />
            <p>
              <b>Tên:</b> {selectedProduct.name}
            </p>
            <p>
              <b>Giá:</b> {Number(selectedProduct.price).toLocaleString()}₫
            </p>
            <p>
              <b>Hãng sản xuất:</b> {selectedProduct.manufacturer}
            </p>
            <p>
              <b>Dạng bào chế:</b> {selectedProduct.dosage_form}
            </p>
            <p>
              <b>Chỉ định:</b> {selectedProduct.indications}
            </p>
          </div>
        )}
      </Modal>

      <CreateProductModal
        visible={createModalVisible}
        onCreate={handleCreate}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateProduct
        visible={updateModalVisible}
        onUpdate={handleUpdateSubmit}
        onCancel={() => setUpdateModalVisible(false)}
        product={selectedProduct}
      />
    </div>
  )
}

export default AdminProduct
