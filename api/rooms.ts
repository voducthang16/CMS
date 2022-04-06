var express = require('express');
var router = express.Router();
const Rooms = require('../model/Rooms');

router.get('/', function(req, res, next) {
    Rooms.find({}, function(err, rooms) {
        if (!err) {
            res.json(rooms);
        } else {
            console.log(err);
        }
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Rooms.findOne({id: id}).exec();
    res.json(data);
})

router.post('/', function(req: any, res, next) {
    const room = new Rooms(req.body);
    room.save();
    res.send(room);
    // res.redirect('../');
})

// get exist name subject
router.get('/subject/:name/:link', async function(req, res, next) {
    const name = req.params.name;
    const link = req.params.link;
    const rowName = await Rooms.count({name: name});
    const rowLink = await Rooms.count({link: link});
    res.send({
        rowName,
        rowLink
    })
})

module.exports = router;