const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

app.use(bodyParser.json()) //to parse body of post requests

const db = require('./config/keys').MONGO_DB_URI

mongoose.connect(db, {useNewUrlParser: true}).then(() => {
    console.log('MongoDB Connected')
}).catch(err => console.log(err))


app.use('/api/items', items)

//SERVE STATIC FOLDER IF WE ARE ON PROD
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
    })
}



const port = process.env.PORT || 5000
app.listen(port,()=> {
    console.log(`Server started at port ${port}`)
})




