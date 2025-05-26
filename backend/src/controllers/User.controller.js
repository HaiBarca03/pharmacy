const { validationResult } = require('express-validator')
const userService = require('../services/User.service')

const register = async (req, res) => {
  // console.log('req', req)
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const user = await userService.register(req.body)
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const { token, user } = await userService.login(req.body)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const { page, limit, role } = req.query
    const result = await userService.getAllUsers({ page, limit, role })
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userService.getUserById(id)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getMyAccount = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const user = await userService.getUserById(user_id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.id
    const currentId = req.user.user_id
    console.log('req.body', req.body)
    if (req.user.role === 'admin' || user_id === currentId) {
      const updatedUser = await userService.updateUser(user_id, req.body)
      return res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser
      })
    } else {
      return res.status(403).json({ error: 'Permission denied' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteUsers = async (req, res) => {
  try {
    const { user_ids } = req.body
    console.log('user_ids', user_ids)

    if (!Array.isArray(user_ids) || user_ids.length === 0) {
      return res
        .status(400)
        .json({ error: 'user_ids must be a non-empty array' })
    }

    const result = await userService.deleteUsers(user_ids)

    res.status(200).json({
      message: `${result.deletedCount} user(s) deleted successfully`
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteMyAccount = async (req, res) => {
  try {
    const user_id = req.user.user_id

    const result = await userService.deleteMyAccount(user_id)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  getMyAccount,
  updateUser,
  deleteUsers,
  deleteMyAccount
}
