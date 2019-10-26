const models = require('../models')
const Customers = models.customers
const Rooms = models.rooms
const Orders = models.orders


const ip = `http://192.168.1.41:5000/`

exports.index = (req, res) => {
    let query
    query = Orders.findAll({
        include: [{
            model: Customers,
            as: "customerid"
        },{
            model: Rooms,
            as: "roomid"
        }
        ]
    })
    query.then(toons=>res.send({
        message : "success",
        data : toons
    }))
}

exports.store = (req, res) => {
    const data ={
        customer_id : req.body.customer_id,
        //image : ip + req.file.path,
        room_id : req.body.room_id,
        is_done : false,
        is_booked : true,
        duration : req.body.duration,

    }
    Orders.create(data).then(toon=> {
        res.send({
            message: "success",
            data : toon
        })
    })
}

exports.update = (req, res) => {
    const data ={
        customer_id : req.body.customer_id,
        //image : ip + req.file.path,
        room_id : req.body.room_id,
        is_done : req.body.is_done,
        is_booked : req.body.is_booked,
        duration : req.body.duration,

    }
    Orders.update(
        data,
        {where: {id: req.params.customer_id}}
    ).then(toon=> {
        res.send({
            message: "success",
            data : toon
        })
    })
}

exports.delete = (req, res) => {
    Orders.destroy({where: {
        id : req.params.customer_id}
        }).then(toon=> {
        res.send({
            message: "successss delete",
            data :toon
        })
    })
}