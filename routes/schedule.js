var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var url = req.originalUrl;
    url = url.substr(1);
    req.session.userId = '624a51840d208a89390fd10b';
    res.render('student_schedule', {
        url: url,
        role: req.session.role,
        id: req.session.userId
    });
});
module.exports = router;
