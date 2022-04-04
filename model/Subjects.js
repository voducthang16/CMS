var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = new Schema({
    name: { type: String, require: true },
    code: { type: String, require: true },
    room: { type: String, require: true },
    lecturer: { type: String, require: true },
    students: { type: Array, require: true },
    timeStart: { type: Date, require: true },
    timeEnd: { type: Date, require: true },
    weekdays: { type: Array, require: true }
}, {
    timestamps: true
});
module.exports = mongoose.model('Subject', Subject);
