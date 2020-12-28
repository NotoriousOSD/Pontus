const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Profile = new Schema({
    userEmail: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'profiles'
})

module.exports = mongoose.model('Profile', Profile);
