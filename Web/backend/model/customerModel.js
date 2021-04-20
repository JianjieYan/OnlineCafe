const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({

    name: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },


});

module.exports = mongoose.model('CustomerSchema', CustomerSchema);