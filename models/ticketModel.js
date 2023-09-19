const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TicketSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    }, 
    content: {
        type: String,
        required: true,
    },    
    status: {
        type: String,
        default: 'Received'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Ticket', TicketSchema)