var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let url = req.originalUrl;
    url = url.substr(1)
    res.render('list', {
        url: url,
        role: req.session.role
    });
});

module.exports = router;