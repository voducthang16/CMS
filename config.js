const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cms', {

        })
        console.log('Connected to MongoDB successfully')
    } catch (e) {
        console.log('Connected to MongoDB failed: ' + e.message)
    }
}

module.exports = { connect }