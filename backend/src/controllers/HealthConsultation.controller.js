const healthConsultationService = require('../services/HealthConsultation.service')

const createHealthConsultation = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const consultation =
      await healthConsultationService.createHealthConsultation(
        req.body,
        user_id
      )
    res.status(201).json({ consultation })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getAllHealthConsultations = async (req, res) => {
  try {
    const { user_id, page, limit, sort } = req.query
    const data = await healthConsultationService.getAllHealthConsultations({
      user_id,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getHealthConsultationById = async (req, res) => {
  try {
    const { id } = req.params
    const consultation =
      await healthConsultationService.getHealthConsultationById(id)
    res.status(200).json({ consultation })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getHealthConsultationMyAccount = async (req, res) => {
  try {
    const user_id = req.user.user_id
    console.log('user_id', user_id)
    const consultations =
      await healthConsultationService.getHealthConsultationMyAccount(user_id)
    res.status(200).json(consultations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateHealthConsultation = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const updated = await healthConsultationService.updateHealthConsultation(
      id,
      data,
      req.user
    )
    res.status(200).json({ consultation: updated })
  } catch (err) {
    res.status(403).json({ error: err.message })
  }
}

const deleteHealthConsultation = async (req, res) => {
  try {
    const { id } = req.params
    const checkAns = await healthConsultationService.getHealthConsultationById(
      id
    )
    const author_id = checkAns.user_id
    if (author_id !== req.user.user_id || req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'You can only update your own articles' })
    }
    const result = await healthConsultationService.deleteHealthConsultation(id)
    res.status(200).json(result)
  } catch (err) {
    res.status(403).json({ error: err.message })
  }
}

module.exports = {
  createHealthConsultation,
  getAllHealthConsultations,
  getHealthConsultationById,
  getHealthConsultationMyAccount,
  updateHealthConsultation,
  deleteHealthConsultation
}
