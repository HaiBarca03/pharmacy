const express = require('express')
const router = express.Router()

const userRouter = require('../routers/User.routers')
const categoryRouter = require('../routers/Category.routers')
const productRouter = require('../routers/Product.routers')
const articleRouter = require('../routers/Article.routers')
const healthConsultationRouter = require('../routers/HealthConsultation.routers')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/article', articleRouter)
router.use('/health-consultation', healthConsultationRouter)

module.exports = router
