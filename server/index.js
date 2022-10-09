const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const FriendModel = require('./models/friends.js')

mongoose.connect('mongodb://127.0.0.1:27017/MERN-starter',
                  {useNewUrlParser: true}                    
)

app.get('/insert', async (req,res) => {
    const friend = new FriendModel({name: 'John',age: 21})
    await friend.save()
    res.send('Inserted friend data')
})

app.get('/read', (req,res) => {
    FriendModel.find({}, (error,result) => {
        if(error) res.send(error)
            else res.send(result)
    })
})
app.listen(3001, _=> console.log('Server Listening at PORT:3001'))