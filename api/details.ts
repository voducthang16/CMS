var express = require('express');
var router = express.Router();
const Details = require('../model/Details');

router.get('/', function(req, res) {
    res.send('HELLO WORLD')
})

router.get('/subject/:id', async function(req, res) {
    const id = req.params.id;
    const data = await Details.findOne({ subject_id: id }).exec();
    res.json(data)
})

router.get('/lecturer/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Details.find({}).populate('subject_id').exec();
    let result = [];
    data.forEach(item => {
        if (item.subject_id.lecturer == id) {
            result.push(item)
        }
    })
    res.json(result)
    // const data = await Details.find().populate({
    //     path: 'subject_id',
    //     match: {
    //         lecturer: id
    //     }
    // }).exec();
    // res.json(data);
})

router.get('/student/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Details.find({}).populate('subject_id').exec();
    let result = [];
    data.forEach(item => {
        if (item.subject_id.students.includes(id)) {
            result.push(item)
        }
    })
    res.json(result)
})

router.post('/', function(req: any, res, next) {
    const detail = new Details(req.body);
    detail.save();
    res.send(detail);
    // res.redirect('../');
})

router.patch('/rollup/:id/:day', async (req, res) => {
    const id = req.params.id;
    const day = req.params.day;
    let combined = `${id}_${day}`;
    const result = await Details.findOne({ subject_id: id}).exec();
    result.rollUps.forEach((item, index) => {
        if (item.id == combined) {
            result.rollUps[index] = {
                id: item.id,
                day: item.day,
                rollup: req.body.data
            }
        }
    })
    await result.save();
    res.send(result);
})

module.exports = router;