import React, { useState } from 'react'
import { Modal, Form, Input, InputNumber, Switch, Select } from 'antd'
import './CreateProduct.css'
import { useDispatch, useSelector } from 'react-redux'

const CreateProductModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const listCaegories = useSelector(
    (state) => state.category.CategoriesList || []
  )
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.image_url = values.image_url
          ? values.image_url.split(',').map((url) => url.trim())
          : []
        values.active_ingredients = values.active_ingredients
          ? values.active_ingredients.split(',').map((ing) => ing.trim())
          : []

        onCreate(values)
        form.resetFields()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <Modal
      open={visible}
      title="Thêm sản phẩm mới"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Tạo"
      cancelText="Hủy"
      className="create-product-modal"
    >
      <Form layout="vertical" form={form} className="create-product-form">
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true }]}
          className="form-item"
        >
          <Input className="input" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
          className="form-item"
        >
          <Input.TextArea rows={2} className="textarea" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true }]}
          className="form-item"
        >
          <InputNumber min={0} style={{ width: '100%' }} className="input" />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Tồn kho"
          rules={[{ required: true }]}
          className="form-item"
        >
          <InputNumber min={0} style={{ width: '100%' }} className="input" />
        </Form.Item>
        <Form.Item
          name="category_id"
          label="Danh mục sản phẩm"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          className="form-item"
        >
          <Select
            placeholder="Chọn danh mục"
            className="input"
            showSearch
            optionFilterProp="children"
          >
            {listCaegories.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="image_url"
          label="Ảnh (cách nhau bởi dấu phẩy)"
          className="form-item"
        >
          <Input className="input" />
        </Form.Item>
        <Form.Item
          name="is_prescription"
          label="Cần kê đơn?"
          valuePropName="checked"
          className="form-item"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="manufacturer"
          label="Hãng sản xuất"
          rules={[{ required: true }]}
          className="form-item"
        >
          <Input className="input" />
        </Form.Item>
        <Form.Item
          name="expiry_date"
          label="Hạn sử dụng"
          rules={[{ required: true }]}
          className="form-item"
        >
          <Input type="date" className="input" />
        </Form.Item>
        <Form.Item
          name="dosage_form"
          label="Dạng bào chế"
          rules={[{ required: true }]}
          className="form-item"
        >
          <Input className="input" />
        </Form.Item>
        <Form.Item
          name="active_ingredients"
          label="Hoạt chất (cách nhau bởi dấu phẩy)"
          className="form-item"
        >
          <Input className="input" />
        </Form.Item>
        <Form.Item
          name="indications"
          label="Chỉ định"
          rules={[{ required: true }]}
          className="form-item"
        >
          <Input.TextArea rows={2} className="textarea" />
        </Form.Item>
        <Form.Item
          name="usage_instructions"
          label="Hướng dẫn sử dụng"
          rules={[{ required: true }]}
          className="form-item"
        >
          <Input.TextArea rows={2} className="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateProductModal
