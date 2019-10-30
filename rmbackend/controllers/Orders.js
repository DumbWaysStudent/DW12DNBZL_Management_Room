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
    const data ={
        is_done : false,
        is_booked : true,
        duration : req.body.duration,
        order_end_time : req.body.order_end_time
    }
    Orders.create(data).then((data)=>{
        Rooms.update(
            {
                order_id : data.id,
                customer_id : req.body.customer_id
            },
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
    )
}

exports.update = (req, res) => {
    const data ={
        is_done : true,
        is_booked : false,
    }
    Orders.update(
        data,
        {where: {id: req.params.order_id}}
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
    Orders.destroy({where: {
        id : req.params.customer_id}
        }).then(data=> {
        res.send({
            message: "successss delete",
            data
        })
    })
}