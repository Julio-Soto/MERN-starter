const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const FriendModel = require('./models/friends.js')

mongoose.connect('mongodb://127.0.0.1:27017/MERN-starter',
                  {useNewUrlParser: true}                    
)

app.get('/insert', async (req,res) => {
    const friend = new FriendModel({name: 'Pedro',age: 27})
    await friend.save()
    res.send('Inserted friend data')
})


app.listen(3001, _=> console.log('Server Listening at PORT:3001'))