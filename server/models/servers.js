const mongoose = require('mongoose');

const serversSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
})

// Export schema
module.exports = mongoose.model('Servers', serversSchema);
