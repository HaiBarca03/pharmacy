const productService = require('../services/Product.service')
const categoryService = require('../services/Category.service')

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body)
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      priceMin: req.query.priceMin,
      priceMax: req.query.priceMax,
      manufacturer: req.query.manufacturer,
      is_prescription: req.query.is_prescription,
      category_id: req.query.category_id
    }
    if (filters.category_id) {
      const checkCategoryId = categoryService.getCategoryById(
        filters.category_id
      )
      if (filters.category_id && !checkCategoryId) {
        return res.status(400).json({ error: 'Không có danh mục này' })
      }
    }
    const result = await productService.getAllProducts(filters)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const updated = await productService.updateProduct(id, req.body)
    res
      .status(200)
      .json({ message: 'Product updated successfully', product: updated })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    await productService.deleteProduct(id)
    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getProductsByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const filters = {
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      manufacturer: req.query.manufacturer || undefined,
      is_prescription:
        req.query.is_prescription !== undefined
          ? req.query.is_prescription === 'true'
          : undefined
    }

    const result = await productService.getProductsByCategoryId(
      categoryId,
      filters,
      page,
      limit
    )
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getProductById = async (req, res) => {
  try {
    const id = req.params.id
    const product = await productService.getProductById(id)
    res.status(200).json(product)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProductById
}
