var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var url = req.originalUrl;
    url = url.substr(1);
    res.render('room', {
        url: url,
        role: req.session.role
    });
});
module.exports = router;
