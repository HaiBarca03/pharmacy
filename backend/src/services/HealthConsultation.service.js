const { HealthConsultation, User } = require('../entities')

const createHealthConsultation = async (data, user_id) => {
  const requiredFields = ['question']
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`${field} is required`)
    }
  }

  const dataCreate = {
    ...data,
    user_id
  }

  const consultation = await HealthConsultation.create(dataCreate)
  return consultation.toJSON()
}

const getAllHealthConsultations = async ({
  user_id,
  page = 1,
  limit = 10,
  sort = 'desc'
}) => {
  const where = {}
  if (user_id) {
    where.user_id = user_id
  }

  const offset = (page - 1) * limit
  const order = [['submitted_at', sort === 'asc' ? 'ASC' : 'DESC']]

  const { rows, count } = await HealthConsultation.findAndCountAll({
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
    consultations: rows.map((c) => c.toJSON()),
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  }
}

const getHealthConsultationById = async (id) => {
  const consultation = await HealthConsultation.findByPk(id, {
    include: {
      model: User,
      attributes: ['user_id', 'name', 'email']
    }
  })

  if (!consultation) {
    throw new Error('Health consultation not found')
  }

  return consultation.toJSON()
}

const getHealthConsultationMyAccount = async (user_id) => {
  console.log('user_id', user_id)
  const consultations = await HealthConsultation.findAll({
    where: { user_id },
    include: {
      model: User,
      attributes: ['user_id', 'name', 'email']
    }
  })

  return consultations.map((c) => c.toJSON())
}

const updateHealthConsultation = async (id, data, user) => {
  const consultation = await HealthConsultation.findByPk(id)

  if (!consultation) {
    throw new Error('Consultation not found')
  }

  if (data.question !== undefined) {
    if (consultation.user_id !== user.user_id) {
      throw new Error('You are not allowed to update this question')
    }
    consultation.question = data.question
  }

  if (data.answer !== undefined) {
    if (user.role !== 'admin') {
      throw new Error('Only admin can update the answer')
    }
    consultation.answer = data.answer
  }

  await consultation.save()
  return consultation.toJSON()
}

const deleteHealthConsultation = async (id) => {
  const consultation = await HealthConsultation.findByPk(id)

  if (!consultation) {
    throw new Error('Consultation not found')
  }
  await consultation.destroy()
  return { message: 'Consultation deleted successfully' }
}

module.exports = {
  createHealthConsultation,
  getAllHealthConsultations,
  getHealthConsultationById,
  getHealthConsultationMyAccount,
  updateHealthConsultation,
  deleteHealthConsultation
}
