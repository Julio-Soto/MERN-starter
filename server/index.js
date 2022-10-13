const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const FriendModel = require('./models/friends.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/MERN-starter',
                  {useNewUrlParser: true}                    
)

app.post('/insert', async (req,res) => {
    const name = req.body.name
    const age = req.body.age
    const friend = new FriendModel({name: name,age: age})
    await friend.save()
    res.send('Inserted friend data')
})

app.get('/read', (req,res) => {
    FriendModel.find({}, (error,result) => {
        if(error) res.send(error)
            else res.send(result)
    })
})

app.put('/update',  (req,res) => {
    const newAge = req.body.newAge
    const id = req.body.id
    try {
           FriendModel.findById(id,(err,friend) => {
            friend.age = Number(newAge)
            friend.save()
        })            
    }catch(err){
        console.log(err)
    }
    res.send('record updated')
})

app.delete('/delete', (req,res) => {
    //const _id = req.params.id

    FriendModel.findOneAndRemove({_id : req.query.id})
        .then(friend => {
            if(friend) res.status(200).send(friend.name + ' Record deleted')
            else res.status(400).send(req.query.id + ' record not found')
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
          })
})

app.listen(3001, _=> console.log('Server Listening at PORT:3001'))