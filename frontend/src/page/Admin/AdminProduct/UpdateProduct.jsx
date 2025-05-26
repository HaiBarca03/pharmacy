import React, { useEffect } from 'react'
import { Modal, Form, Input, InputNumber, Switch } from 'antd'
import './CreateProduct.css'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

const UpdateProduct = ({ visible, onUpdate, onCancel, product }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        image_url: product.image_url?.join(', '),
        active_ingredients: product.active_ingredients?.join(', '),
        expiry_date: dayjs(product.expiry_date)
      })
    }
  }, [product, form])

  const handleOk = () => {
    form.validateFields().then((values) => {
      values.image_url = values.image_url
        ? values.image_url.split(',').map((url) => url.trim())
        : []
      values.active_ingredients = values.active_ingredients
        ? values.active_ingredients.split(',').map((i) => i.trim())
        : []

      onUpdate({ ...product, ...values })
      form.resetFields()
    })
  }

  return (
    <Modal
      open={visible}
      title="Cập nhật sản phẩm"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Cập nhật"
      cancelText="Hủy"
      className="create-product-modal"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="stock" label="Tồn kho" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="category_id"
          label="Mã danh mục"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="image_url" label="Ảnh (phân cách bởi dấu phẩy)">
          <Input />
        </Form.Item>
        <Form.Item
          name="is_prescription"
          label="Cần kê đơn?"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="manufacturer"
          label="Hãng sản xuất"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="expiry_date"
          label="Hạn sử dụng"
          rules={[{ required: true, message: 'Vui lòng chọn hạn sử dụng' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="dosage_form"
          label="Dạng bào chế"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="active_ingredients"
          label="Hoạt chất (phân cách bởi dấu phẩy)"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="indications"
          label="Chỉ định"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="usage_instructions"
          label="Hướng dẫn sử dụng"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateProduct
