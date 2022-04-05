var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Detail = new Schema({
    subject_id: {type: Schema.Types.ObjectId, require: true, ref: 'Subject'},
    scores: {type: Array, require: true},
    rollUps: {type: Array, require: true}
}, {
    timestamps: true,
})

module.exports = mongoose.model('Detail', Detail);