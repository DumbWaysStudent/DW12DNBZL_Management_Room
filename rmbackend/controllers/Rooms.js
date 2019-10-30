const models = require('../models')
const Customers = models.customers
const Rooms = models.rooms
const Orders = models.orders



const ip = `http://192.168.1.41:5000/`

exports.index = (req, res) => {
    let query
    query = Rooms.findAll({
        include: [{
            model: Customers,
            as: "customerid"
        },{
            model: Orders,
            as: "orderid"
        }]
    })
    query.then(data=>res.send({
        message : "success",
        data
    })
    )
}

exports.store = (req, res) => {
    const datas ={
        name : req.body.name,
        order_id : null,
        customer_id : null
    }
    Rooms.create(datas).then(data=> 
        res.send({
            message: "success",
            data
        })
    )
}

exports.update = (req, res) => {
    const data ={
        name : req.body.name,
        
    }
    Rooms.update(
        data,
        {where: {id: req.params.room_id}}
    ).then(()=> Rooms.findAll({
        include: [{
            model: Customers,
            as: "customerid"
        },{
            model: Orders,
            as: "orderid"
        }]
    })
    .then(data=>res.send({
        message : "success",
        data
    })
    )
    )
}

exports.delete = (req, res) => {
    Rooms.destroy({where: {
        id : req.params.room_id}
        }).then(data=> {
        res.send({
            message: "successss delete",
            data
        })
    })
}