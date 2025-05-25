const bcrypt = require('bcryptjs')
const { User } = require('../entities/index')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'

const register = async (data) => {
  const existingUser = await User.findOne({ where: { email: data.email } })
  if (existingUser) throw new Error('Email already in use')

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    role: 'user',
    password_hash: hashedPassword
  })

  return newUser
}

const login = async ({ identifier, password }) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { phone: identifier }]
    }
  })

  if (!user) throw new Error('User not found')

  const isMatch = await bcrypt.compare(password, user.password_hash)
  if (!isMatch) throw new Error('Invalid password')

  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )

  return { token, user }
}

const getAllUsers = async ({ page = 1, limit = 10, role }) => {
  const offset = (page - 1) * limit

  const whereClause = role ? { role: { [Op.eq]: role } } : {}

  const { rows: users, count: total } = await User.findAndCountAll({
    where: whereClause,
    offset: parseInt(offset),
    limit: parseInt(limit),
    order: [['created_at', 'DESC']],
    attributes: { exclude: ['password_hash'] }
  })

  return {
    users,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  }
}

const getUserById = async (user_id) => {
  const user = await User.findOne({
    where: { user_id },
    attributes: { exclude: ['password_hash'] }
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

const updateUser = async (user_id, data) => {
  const user = await User.findByPk(user_id)
  if (!user) throw new Error('User not found')

  const updatableFields = ['name', 'phone', 'address', 'gender', 'dob', 'email']
  updatableFields.forEach((field) => {
    if (data[field] !== undefined) {
      user[field] = data[field]
    }
  })

  await user.save()

  const { password_hash, ...userData } = user.toJSON()
  return userData
}

const deleteUsers = async (user_ids) => {
  if (!Array.isArray(user_ids) || user_ids.length === 0) {
    throw new Error('user_ids must be a non-empty array')
  }

  const deletedCount = await User.destroy({
    where: {
      user_id: {
        [Op.in]: user_ids
      }
    }
  })

  return { deletedCount }
}

const deleteMyAccount = async (user_id) => {
  const user = await User.findByPk(user_id)
  if (!user) throw new Error('User not found')

  await user.destroy()

  return { message: 'Account deleted successfully' }
}

module.exports = {
  getAllUsers,
  register,
  login,
  getUserById,
  updateUser,
  deleteUsers,
  deleteMyAccount
}
