const router = require('express').Router()
const emailCtrl = require('../controllers/emailController')

router.get('/email', emailCtrl.getEmails)
router.post('/email', emailCtrl.createMail)
router.delete('/email/:id', emailCtrl.deleteMail)

module.exports = router