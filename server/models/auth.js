const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    id: String,
})

// Export schema
module.exports = mongoose.model('Users', usersSchema);
