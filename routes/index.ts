var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let view = 'auth';
    if (req.session.login) {
        view = 'index'
    }
    res.render(`${view}`, { title: 'Express' });
});

module.exports = router;