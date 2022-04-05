var express = require('express');
var router = express.Router();
const Details = require('../model/Details');

router.get('/', function(req, res) {
    res.send('HELLO WORLD')
})

router.post('/', function(req: any, res, next) {
    const detail = new Details(req.body);
    detail.save();
    res.send(detail);
    // res.redirect('../');
})

module.exports = router;
