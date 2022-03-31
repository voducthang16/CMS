var express = require('express');
var router = express.Router();
const Users = require('../model/Users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Users.find({}, function(err, user) {
        if (!err) {
            res.json(user);
        } else {
            console.log(err);
        }
    })
});

// Create new user
router.post('/', function(req: any, res, next) {
    const user = new Users(req.body);
    user.save();
    req.session.login = true;
    req.session.email = req.body.email;
    req.session.role = user.role;
    res.redirect('../');
})

// Get one user
router.get('/email/:email', async function(req, res, next) {
    const email = req.params.email;
    const data = await Users.findOne({ email: email }).exec();
    // exist
    if (data) {
        res.send(data);
    } else {
        res.send({
            exist: false
        });
    }
})

// Get user information
router.get('/info/:email/:password', async function (req, res, next) {
    const email = req.params.email;
    const password = req.params.password;
    const data = await Users.findOne({ email: email, password: password }).exec();
    // exist
    if (data) {
        req.session.login = true;
        req.session.email = data.email;
        req.session.role = data.role;
        res.send(data);
    } else {
        res.send({
            exist: false
        });
    }
})

module.exports = router;