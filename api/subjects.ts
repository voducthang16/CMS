var express = require('express');
var router = express.Router();
const Subjects = require('../model/Subjects');

router.get('/', (req, res) => {
    Subjects.find({}).populate('room lecturer').exec((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    const data = await Subjects.count({name: name});
    res.send({data});
})

router.get('/one', async (req, res) => {
    Subjects.findOne({}).sort('-createdAt').exec((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

router.post('/', function(req: any, res, next) {
    const subject = new Subjects(req.body);
    subject.save();
    res.send(subject);
    // res.redirect('../');
})

module.exports = router;
