var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let url = req.originalUrl;
    url = url.substr(1)
    req.session.userId = '624a519e0d208a89390fd10e'
    res.render('registration', {
        url: url,
        role: req.session.role,
        id: req.session.userId
    });
});

module.exports = router;