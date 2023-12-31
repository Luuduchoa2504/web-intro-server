const router = require('express').Router()
const emailCtrl = require('../controllers/emailController')

router.get('/email', emailCtrl.getEmails)
router.post('/email', emailCtrl.createMail)
router.put('/email/:id', emailCtrl.updateMail)
router.delete('/email/:id', emailCtrl.deleteMail)

module.exports = router