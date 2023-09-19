const Tickets = require('../models/ticketModel')

const ticketCtrl = {
    getTickets: async ( req, res) => {
        try {
           const ticket = await Tickets.find();
           res.json(ticket)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    createTicket: async (req, res) => {
        try {
            const { email, name, phone, content } = req.body;
            const existingTicket = await Tickets.findOne({ email });

            if (existingTicket) {
            return res.status(400).json({ message: "This ticket already exists" });
            }
            const newTicketSend = new Tickets({ email, name, phone, content });
            await newTicketSend.save();
            res.json({ message: "New ticket submitted" });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message })
        }
    },
    deleteTicket: async (req, res) => {
        try {
            await Tickets.findByIdAndDelete(req.params.id)
            res.json({ message: "Delete ticket successfully" })
        } catch (err) {
            return res.status(500).json({ message: error.message })
        }
    },
}

module.exports = ticketCtrl