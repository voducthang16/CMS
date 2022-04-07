var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let url = req.originalUrl;
    url = url.substr(1)
    if (!req.session.login) {
        res.redirect('./');
        return;
    }
    if (req.session.role != 0) {
        res.render('permission', {})
    } else {
        res.render('list', {
            url: url,
            role: req.session.role
        });
    }
});

module.exports = router;