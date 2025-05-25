const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const HealthConsultation = sequelize.define(
  'HealthConsultation',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'health_consultations',
    timestamps: false
  }
)

module.exports = HealthConsultation
