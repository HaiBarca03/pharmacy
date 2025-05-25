const { Article, User } = require('../entities')

const createArticle = async (data, author_id) => {
  const requiredFields = ['title', 'content']
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`${field} is required`)
    }
  }

  const article = await Article.create({
    title: data.title,
    content: data.content,
    author_id: author_id
  })

  return article.toJSON()
}

const getAllArticles = async ({
  author_id,
  sort = 'desc',
  page = 1,
  limit = 10
}) => {
  const where = {}

  if (author_id) {
    where.author_id = author_id
  }

  const order = [['created_at', sort === 'asc' ? 'ASC' : 'DESC']]

  const offset = (page - 1) * limit

  const { rows, count } = await Article.findAndCountAll({
    where,
    order,
    limit,
    offset,
    include: {
      model: User,
      attributes: ['user_id', 'name', 'email']
    }
  })

  return {
    articles: rows.map((a) => a.toJSON()),
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  }
}

const updateArticle = async (id, data) => {
  const article = await Article.findByPk(id)
  if (!article) throw new Error('Article not found')

  const updatableFields = ['title', 'content', 'author_id']
  updatableFields.forEach((field) => {
    if (data[field] !== undefined) {
      article[field] = data[field]
    }
  })

  await article.save()
  return article.toJSON()
}

const deleteArticle = async (id) => {
  const article = await Article.findByPk(id)
  if (!article) throw new Error('Article not found')

  await article.destroy()
  return true
}

const getArticleById = async (id) => {
  const article = await Article.findByPk(id, {
    include: {
      model: User,
      attributes: ['user_id', 'name', 'email']
    }
  })
  if (!article) throw new Error('Article not found')

  return article.toJSON()
}

module.exports = {
  createArticle,
  getAllArticles,
  updateArticle,
  deleteArticle,
  getArticleById
}
