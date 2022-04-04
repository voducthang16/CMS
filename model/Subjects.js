var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = new Schema({
    name: { type: String, require: true },
    code: { type: String, require: true },
    room: { type: Schema.Types.ObjectId, require: true, ref: 'Room' },
    lecturer: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    students: { type: Array, "default": [] },
    // timeSchedule: {type: Array, require: true},
    startTime: { type: String, require: true },
    endTime: { type: String, require: true },
    startDay: { type: String, require: true },
    endDay: { type: String, require: true },
    weekdays: { type: Number, require: true },
    status: { type: Number, "default": 0 }
}, {
    timestamps: true
});
module.exports = mongoose.model('Subject', Subject);
