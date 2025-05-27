const express = require('express')
const router = express.Router()
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProductById,
  searchProducts,
  getProductsSortedByPrice
} = require('../controllers/Product.controller')
const { authorizeAdmin } = require('../middlewares/auth')

router.post('/', authorizeAdmin, createProduct)
router.get('/category/:categoryId', getProductsByCategoryId)
router.get('/search', searchProducts)
router.get('/get-by-price', getProductsSortedByPrice)
router.get('/:id', getProductById)
router.get('/', getAllProducts)
router.put('/:id', authorizeAdmin, updateProduct)
router.delete('/:id', authorizeAdmin, deleteProduct)

module.exports = router
