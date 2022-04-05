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

// Get role of users
router.get('/role/:role', async function(req, res, next) {
    const role = req.params.role;
    const data = await Users.find({ role: role }).exec();
    // exist
    if (data) {
        res.json(data);
    } else {
        res.send({
            exist: false
        });
    }
})

router.get('/:id', async function(req, res) {
    const id = req.params.id;
    const data = await Users.find({ _id: id }).exec();
    if (data) {
        res.json(data);
    } else {
        res.send({
            exist: false
        });
    }
})

// Get one user by email
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
        req.session.userId = data._id;
        res.send(data);
    } else {
        res.send({
            exist: false
        });
    }
})

// Create new user
router.post('/', function(req: any, res, next) {
    const user = new Users(req.body);
    user.save();
    req.session.login = true;
    req.session.email = req.body.email;
    req.session.role = user.role;
    req.session.userId = user._id;
    res.redirect('../');
})

// Update role of user
router.patch('/role/:id', async function(req: any, res, next) {
    const id = req.params.id;
    const user = await Users.findOne({ _id: id }).exec();
    user.role = req.body.role;
    await user.save();
    res.send(user);
})

// Delete user
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Users.deleteOne({ _id: id }).exec();
    res.send(result);
})

module.exports = router;