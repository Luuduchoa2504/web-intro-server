const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/auth', userCtrl.auth)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/info', auth, userCtrl.getUser)
router.get('/getAllUsers', userCtrl.getAllUsers)
router.delete('/delete/:id', userCtrl.deleteAccount)
router.get('/getAllAdmins', userCtrl.getAdmins)
router.patch('/addcart', auth, userCtrl.addCart)

module.exports = router