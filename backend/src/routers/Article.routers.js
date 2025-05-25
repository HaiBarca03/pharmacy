const express = require('express')
const router = express.Router()
const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} = require('../controllers/Article.controller')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')

router.post('/', authorizeUser, createArticle)
router.get('/:id', getArticleById)
router.get('/', getAllArticles)
router.put('/:id', authorizeUser, updateArticle)
router.delete('/:id', authorizeAdmin, deleteArticle)

module.exports = router
