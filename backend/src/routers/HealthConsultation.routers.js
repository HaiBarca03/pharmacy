const express = require('express')
const router = express.Router()
const {
  createHealthConsultation,
  getAllHealthConsultations,
  getHealthConsultationById,
  getHealthConsultationMyAccount,
  updateHealthConsultation,
  deleteHealthConsultation
} = require('../controllers/HealthConsultation.controller')
const { authorizeUser } = require('../middlewares/auth')

router.post('/', authorizeUser, createHealthConsultation)
router.get('/my-account', authorizeUser, getHealthConsultationMyAccount)
router.get('/', getAllHealthConsultations)
router.get('/:id', getHealthConsultationById)
router.put('/:id', authorizeUser, updateHealthConsultation)
router.delete('/:id', authorizeUser, deleteHealthConsultation)

module.exports = router
