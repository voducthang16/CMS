var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var view = 'auth';
    if (req.session.login) {
        view = 'index';
    }
    res.render("".concat(view), { title: 'Express' });
});
module.exports = router;
