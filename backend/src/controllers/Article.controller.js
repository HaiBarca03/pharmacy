const { User } = require('../entities')
const articleService = require('../services/Article.service')

const createArticle = async (req, res) => {
  try {
    const data = req.body
    const author_id = req.user.user_id
    const article = await articleService.createArticle(data, author_id)
    res.status(201).json({ article })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getAllArticles = async (req, res) => {
  try {
    const { author_id, sort, page = 1, limit = 10 } = req.query

    const data = await articleService.getAllArticles({
      author_id,
      sort,
      page: Number(page),
      limit: Number(limit)
    })

    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const checkArticle = await articleService.getArticleById(id)
    if (!checkArticle) {
      return res.status(404).json({ error: 'Article not found' })
    }
    const author_id = checkArticle.author_id
    if (author_id !== req.user.user_id || req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'You can only update your own articles' })
    }
    const updatedArticle = await articleService.updateArticle(id, data)
    res.status(200).json({ article: updatedArticle })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params

    await articleService.deleteArticle(id)
    res.status(200).json({ message: 'Article deleted successfully' })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params
    const article = await articleService.getArticleById(id)
    res.status(200).json({ article })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  updateArticle,
  deleteArticle,
  getArticleById
}
