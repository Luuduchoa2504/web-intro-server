const Emails = require('../models/emailModel')

const emailCtrl = {
    getEmails: async ( req, res) => {
        try {
           const emails = await Emails.find();
           res.json(emails)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    createMail: async (req, res) => {
        try {
            const { email } = req.body;
            const existingEmail = await Emails.findOne({ email });

            if (existingEmail) {
            return res.status(400).json({ message: "This email already exists" });
            }
            const newEmailSend = new Emails({ email });
            await newEmailSend.save();
            res.json({ message: "New email submitted to send notification" });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message })
        }
    },
    updateMail: async (req, res) => {
        try {
            const { email } = req.body;
            await Emails.findByIdAndUpdate({ _id: req.params.id }, { email });
            res.json({ msg: "Update an email" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    deleteMail: async (req, res) => {
        try {
            await Emails.findByIdAndDelete(req.params.id)
            res.json({ message: "Delete mail sent" })
        } catch (err) {
            return res.status(500).json({ message: error.message })
        }
    },
}

module.exports = emailCtrl