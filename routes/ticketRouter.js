const router = require('express').Router()
const ticketCtrl = require('../controllers/ticketController')

router.get('/ticket', ticketCtrl.getTickets)
router.post('/ticket', ticketCtrl.createTicket)
router.put('/ticket/:id', ticketCtrl.updateTicket);
router.delete('/ticket/:id', ticketCtrl.deleteTicket)

module.exports = router