const jwt = require('jsonwebtoken')
const { User } = require('../entities/index')
require('dotenv').config()

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env')
}

const verifyToken = async (req) => {
  try {
    const authHeader = req.headers.token || req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Access token missing. token denied.')
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.user_id)

    if (!user) {
      throw new Error('User not found.')
    }

    const plainUser = user.get({ plain: true })
    return { user: plainUser, decoded }
  } catch (error) {
    throw error
  }
}

const authorizeUser = async (req, res, next) => {
  try {
    const { user } = await verifyToken(req)
    req.user = user
    next()
  } catch (error) {
    console.error('token error:', error.message)
    res.status(error.message.includes('not found') ? 404 : 401).json({
      success: false,
      message: error.message
    })
  }
}

const authorizeAdmin = async (req, res, next) => {
  try {
    const { user } = await verifyToken(req)
    if (user.role !== 'admin') {
      throw new Error('Chỉ admin mới có quyền truy cập')
    }
    req.user = user
    next()
  } catch (error) {
    console.error('token error:', error.message)
    res.status(error.message.includes('not found') ? 404 : 403).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  authorizeUser,
  authorizeAdmin
}
