var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let url = req.originalUrl;
    url = url.substr(1)
    let view = 'auth';
    if (req.session.login) {
        view = 'index';
        if (req.session.role != 0) {
            res.redirect('./schedule');
            return;
        }
    }
    res.render(`${view}`, {
        url: url,
        role: req.session.role
    });
});

module.exports = router;