var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let url = req.originalUrl;
    url = url.substr(1)
    // let view = 'auth';
    // if (req.session.login) {
    //     view = 'index'
    // }
    let view = 'index';
    res.render(`${view}`, {
        url: url
    });
});

module.exports = router;