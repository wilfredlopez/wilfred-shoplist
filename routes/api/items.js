const express = require('express')

const Router = express.Router()

const Item = require('../../models/item')

//@Route Get api/items
Router.get('/', (req, res)=> {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

//@Route POST api/items
Router.post('/', (req, res)=> {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.json(item))
})

//@Route DELETE api/items
Router.delete('/:id', (req, res)=> {
    Item.findById(req.params.id).then(item => 
        item.remove().then(() => res.json({success: true}))
    ).catch((err) => {
        res.status(404).json({success: false})
    })
    
})

module.exports =  Router