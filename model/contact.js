const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    email: String,
    description: String,
    category: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;