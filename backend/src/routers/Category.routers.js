const express = require('express')
const router = express.Router()
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/Category.controller')
const { authorizeAdmin } = require('../middlewares/auth')

router.post('/', authorizeAdmin, createCategory)
router.get('/', getAllCategories)
router.get('/:id', getCategoryById)
router.put('/:id', authorizeAdmin, updateCategory)
router.delete('/:id', authorizeAdmin, deleteCategory)

module.exports = router
