const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const FriendsModel = require('./models/friends.js')

mongoose.connect('mongodb://127.0.0.1:27017/MERN-starter',
                  {useNewUrlParser: true}                    
)

app.listen(3001, _=> console.log('Server Listening at PORT:3001'))