const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    image_url: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    is_prescription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true // Hãng sản xuất
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: true // Hạn sử dụng
    },
    dosage_form: {
      type: DataTypes.STRING,
      allowNull: true // Dạng bào chế: viên, siro, ống tiêm...
    },
    active_ingredients: {
      type: DataTypes.JSON,
      defaultValue: [] // Thành phần hoạt chất chính
    },
    indications: {
      type: DataTypes.TEXT,
      allowNull: true // Chỉ định dùng thuốc
    },
    usage_instructions: {
      type: DataTypes.TEXT,
      allowNull: true // Hướng dẫn sử dụng
    }
  },
  {
    tableName: 'products',
    timestamps: false
  }
)

module.exports = Product
