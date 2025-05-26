import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Image, Tag, Modal } from 'antd'
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  getAllProducts
} from '../../../stores/Product/productApis'
import CreateProductModal from './CreateProduct'

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

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xoá',
      content: 'Bạn có chắc muốn xoá sản phẩm này?',
      okText: 'Xoá',
      cancelText: 'Huỷ',
      okType: 'danger',
      onOk: () => {
        // Gọi API xoá
        console.log('Xoá sản phẩm:', id)
      }
    })
  }

  const handleCreate = (newProduct) => {
    console.log('Tạo sản phẩm mới:', newProduct)
    // newProduct.image_url và active_ingredients đã là mảng rồi

    dispatch(createProduct(newProduct))
    setCreateModalVisible(false)
    // Lấy lại danh sách sản phẩm nếu cần
    dispatch(getAllProducts())
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
    </div>
  )
}

export default AdminProduct
