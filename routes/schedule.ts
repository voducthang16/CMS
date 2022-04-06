var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let url = req.originalUrl;
    url = url.substr(1);
    let view = 'lecturer_schedule'
    if (!req.session.login) {
        res.redirect('./')
    }
    if (req.session.role == 0) {
        res.render('permission', {})
    } else {
        if (req.session.role == 1) {
            view = 'student_schedule';
        }
        res.render(`${view}`, {
            url: url,
            role: req.session.role,
            id: req.session.userId
        });
    }
});

module.exports = router;