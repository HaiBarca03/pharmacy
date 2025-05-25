const { Op } = require('sequelize')
const { Product, Category } = require('../entities')

const createProduct = async (data) => {
  const requiredFields = ['name', 'price', 'category_id']
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`${field} is required`)
    }
  }

  if (data.image_url && !Array.isArray(data.image_url)) {
    throw new Error('image_url must be an array')
  }

  if (data.active_ingredients && !Array.isArray(data.active_ingredients)) {
    throw new Error('active_ingredients must be an array')
  }

  const product = await Product.create(data)
  return product.toJSON()
}

const getAllProducts = async (filters = {}) => {
  const {
    page = 1,
    limit = 12,
    priceMin,
    priceMax,
    manufacturer,
    is_prescription,
    category_id
  } = filters

  const offset = (page - 1) * limit

  const where = {}

  if (priceMin || priceMax) {
    where.price = {}
    if (priceMin) where.price[Op.gte] = priceMin
    if (priceMax) where.price[Op.lte] = priceMax
  }

  if (manufacturer) {
    where.manufacturer = {
      [Op.like]: `%${manufacturer}%`
    }
  }

  if (is_prescription !== undefined) {
    where.is_prescription = is_prescription === 'true'
  }

  if (category_id) {
    where.category_id = category_id
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    offset,
    limit: parseInt(limit)
  })

  return {
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    products: rows.map((p) => p.toJSON())
  }
}

const updateProduct = async (id, updateData) => {
  const product = await Product.findByPk(id)
  if (!product) {
    throw new Error('Product not found')
  }

  if (updateData.image_url && !Array.isArray(updateData.image_url)) {
    throw new Error('image_url must be an array')
  }

  if (
    updateData.active_ingredients &&
    !Array.isArray(updateData.active_ingredients)
  ) {
    throw new Error('active_ingredients must be an array')
  }

  if (updateData.image_url && Array.isArray(updateData.image_url)) {
    const existing = product.image_url || []
    updateData.image_url = [...new Set([...existing, ...updateData.image_url])]
  }

  await product.update(updateData)
  return product.toJSON()
}

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id)
  if (!product) {
    throw new Error('Product not found')
  }

  await product.destroy()
  return { message: 'Product deleted successfully' }
}

const getProductsByCategoryId = async (
  categoryId,
  filters = {},
  page = 1,
  limit = 10
) => {
  const offset = (page - 1) * limit

  const where = {
    category_id: categoryId
  }

  if (filters.minPrice !== undefined) {
    where.price = { ...(where.price || {}), [Op.gte]: filters.minPrice }
  }
  if (filters.maxPrice !== undefined) {
    where.price = { ...(where.price || {}), [Op.lte]: filters.maxPrice }
  }
  if (filters.manufacturer) {
    where.manufacturer = filters.manufacturer
  }
  if (filters.is_prescription !== undefined) {
    where.is_prescription = filters.is_prescription
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    offset,
    limit
  })

  return {
    total: count,
    page,
    limit,
    products: rows.map((p) => p.toJSON())
  }
}

const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ['id', 'name']
    }
  })
  if (!product) {
    throw new Error('Product not found')
  }
  return product.toJSON()
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProductById
}
