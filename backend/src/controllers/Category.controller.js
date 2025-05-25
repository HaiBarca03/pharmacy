const categoryService = require('../services/Category.service')

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body)
    res.status(201).json(category)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories()
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id)
    res.status(200).json(category)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const updated = await categoryService.updateCategory(
      req.params.id,
      req.body
    )
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}
