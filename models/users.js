const mongoose = require('mongoose');


const { Schema } = mongoose;


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: { type: String },
})


module.exports = mongoose.model('user', userSchema);