var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Room = new Schema({
    name: { type: String, require: true },
    link: { type: String, require: true },
    status: { type: Number, "default": 0 }
}, {
    timestamps: true
});
module.exports = mongoose.model('Room', Room);
