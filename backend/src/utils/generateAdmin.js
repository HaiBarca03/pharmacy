const bcrypt = require('bcryptjs')
const { User } = require('../entities')

async function initAdmin() {
  try {
    const adminEmail = 'admin@pharmacy.com'
    const existingAdmin = await User.findOne({ where: { email: adminEmail } })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10)

      await User.create({
        user_id: require('crypto').randomUUID(),
        name: 'Administrator',
        email: adminEmail,
        password_hash: hashedPassword,
        phone: '0123456789',
        address: 'Admin Office',
        role: 'admin'
      })

      console.log(
        '✅ Admin account created: email=admin@pharmacy.com | password=admin123'
      )
    } else {
      console.log('ℹ️ Admin account already exists.')
    }
  } catch (err) {
    console.error('❌ Failed to initialize admin account:', err)
  }
}

module.exports = initAdmin
