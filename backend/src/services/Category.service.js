const { Category } = require('../entities')

const createCategory = async (data) => {
  if (!data.name) throw new Error('Category name is required')
  const category = await Category.create({ name: data.name })
  return category
}

const getAllCategories = async () => {
  const categories = await Category.findAll()
  return categories
}

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id)
  if (!category) throw new Error('Category not found')
  return category
}

const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id)
  if (!category) throw new Error('Category not found')

  if (data.name !== undefined) category.name = data.name

  await category.save()
  return category
}

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id)
  if (!category) throw new Error('Category not found')

  await category.destroy()
  return { message: 'Category deleted successfully' }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}
