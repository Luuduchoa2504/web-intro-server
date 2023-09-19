const router = require('express').Router()
const ticketCtrk = require('../controllers/ticketController')

router.get('/ticket', ticketCtrk.getTickets)
router.post('/ticket', ticketCtrk.createTicket)
router.delete('/ticket/:id', ticketCtrk.deleteTicket)

module.exports = router