const express = require('express')
const {
  register,
  login,
  getAllUsers,
  getUserById,
  getMyAccount,
  updateUser,
  deleteUsers,
  deleteMyAccount
} = require('../controllers/User.controller')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/get-all-user', authorizeAdmin, getAllUsers)
router.get('/my-account', authorizeUser, getMyAccount)
router.get('/:id', authorizeAdmin, getUserById)
router.put('/:id', authorizeUser, updateUser)
router.delete('/my-account', authorizeUser, deleteMyAccount)
router.delete('/', authorizeAdmin, deleteUsers)

module.exports = router
