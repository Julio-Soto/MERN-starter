const mongoose = require('mongoose')


const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
})

const FriendModel = new mongoose.Model('friends',FriendSchema)

module.exports = FriendModel