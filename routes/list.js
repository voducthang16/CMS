var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var url = req.originalUrl;
    url = url.substr(1);
    console.log(url)
    res.render('list', {
        url: url
    });
});
module.exports = router;
