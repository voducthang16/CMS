var express = require('express');
var router = express.Router();
const Subjects = require('../model/Subjects');

router.get('/', (req, res) => {
    Subjects.find({}).populate('room lecturer').exec((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const data = await Subjects.find({
        lecturer: id,
        // endDay: {$gte: '2022-04-06', $lte: '2022-04-26'}
    }).populate('room lecturer').exec();
    res.json(data);
})

router.patch('/:subjectId/:userId', async (req, res) => {
    const subjectId = req.params.subjectId;
    const userId = req.params.userId;
    const subject = await Subjects.findOne({ _id: subjectId }).exec();
    subject.students.push(`${userId}`)
    await subject.save()
    res.send(subject);
})

router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    const data = await Subjects.count({name: name});
    res.send({data});
})

router.get('/one/latest', (req, res) => {
    Subjects.findOne().sort({createdAt: -1}).exec((err, result) => {
        if (err) throw err;
        res.json(result)
    })
    // Subjects.find({}).populate('room lecturer').exec((err, result) => {
    //     if (err) throw err;
    //     res.json(result)
    // })
})

router.post('/', function(req: any, res, next) {
    const subject = new Subjects(req.body);
    subject.save();
    res.send(subject);
    // res.redirect('../');
})

module.exports = router;
