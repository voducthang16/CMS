var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var url = req.originalUrl;
    url = url.substr(1);
    var view = 'auth';
    if (req.session.login) {
        view = 'index';
        if (req.session.role != 0) {
            res.redirect('./schedule');
        }
    }
    res.render("".concat(view), {
        url: url,
        role: req.session.role
    });
});
module.exports = router;
