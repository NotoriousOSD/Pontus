const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Entry = new Schema({
    date: {
        type: Date
    },
    ph: {
        type: Number
    },
    gh: {
        type: Number
    },
    kh: {
        type: Number
    },
    ammonia: {
        type: Number
    },
    nitrites: {
        type: Number
    },
    nitrates: {
        type: Number
    },
    notes: {
        type: String
    }
}, {
    collection: 'entries'
})

module.exports = mongoose.model('Entry', Entry)
