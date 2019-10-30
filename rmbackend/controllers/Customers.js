const models = require('../models')
const Customers = models.customers


const ip = `http://192.168.1.41:5000/`

exports.index = (req, res) => {
    let query
    query = Customers.findAll({
    })
    query.then(data=>res.send({
        message : "success",
        data
    })
    )
}

exports.store = (req, res) => {
    const data ={
        name : req.body.name,
        //image : ip + req.file.path,
        identity_number : req.body.identity_number,
        phone_number: req.body.phone_number
    }
    Customers.create(data).then(data=> {
        res.send({
            message: "success",
            data
        })
    })
}

exports.update = (req, res) => {
    const data ={
        name : req.body.name,
        //image : ip + req.file.path,
        identity_number : req.body.identity_number,
        phone_number: req.body.phone_number
    }
    Customers.update(
        data,
        {where: {id: req.params.customer_id}}
    ).then(()=> 
        Customers.findAll({})
    .then(data=>res.send({
        message : "success",
        data
    })
    )
    )
}

exports.delete = (req, res) => {
    Customers.destroy({where: {
        id : req.params.customer_id}
        }).then(data=> {
        res.send({
            message: "successss delete",
            data
        })
    })
}