const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmailSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Email', EmailSchema)