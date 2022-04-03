var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    role: {type: Number, default: 1},
    email: {type: String, require: true},
    password: {type: String, require: true}
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', User);