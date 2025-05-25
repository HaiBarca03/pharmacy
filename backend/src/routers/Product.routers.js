const express = require('express')
const router = express.Router()
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId
} = require('../controllers/Product.controller')
const { authorizeAdmin } = require('../middlewares/auth')

router.post('/', authorizeAdmin, createProduct)
router.get('/category/:categoryId', getProductsByCategoryId)
router.get('/', getAllProducts)
router.put('/:id', authorizeAdmin, updateProduct)
router.delete('/:id', authorizeAdmin, deleteProduct)

module.exports = router
