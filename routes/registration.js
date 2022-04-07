var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var url = req.originalUrl;
    url = url.substr(1);
    if (!req.session.login) {
        res.redirect('./');
        return;
    }
    if (req.session.role != 1) {
        res.render('permission', {});
    }
    else {
        res.render('registration', {
            url: url,
            role: req.session.role,
            id: req.session.userId
        });
    }
});
module.exports = router;
