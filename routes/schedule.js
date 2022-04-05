var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var url = req.originalUrl;
    url = url.substr(1);
    req.session.userId = '62455e3350561051506e577b';
    res.render('schedule', {
        url: url,
        role: req.session.role,
        id: req.session.userId
    });
});
module.exports = router;
