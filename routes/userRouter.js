const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/auth', userCtrl.auth)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

//Dasboard
router.get('/info', auth, userCtrl.getUser)
router.get('/user/getAll', userCtrl.getAllUsers)
router.delete('/user/:id', userCtrl.deleteAccount)
router.get('/admin/getAll', userCtrl.getAdmins)
router.post('/create', userCtrl.createAccount)
router.patch('/addcart', auth, userCtrl.addCart)

module.exports = router