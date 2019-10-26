const models = require('../models')
const Customers = models.customers


const ip = `http://192.168.1.41:5000/`

exports.index = (req, res) => {
    let query
    query = Customers.findAll({
    })
    query.then(toons=>res.send({
        message : "success",
        data : toons
    }))
}

exports.store = (req, res) => {
    const data ={
        name : req.body.name,
        //image : ip + req.file.path,
        identity_number : req.body.identity_number,
        phone_number: req.body.phone_number
    }
    Customers.create(data).then(toon=> {
        res.send({
            message: "success",
            data : toon
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
    ).then(toon=> {
        res.send({
            message: "success",
            data : toon
        })
    })
}

exports.delete = (req, res) => {
    Customers.destroy({where: {
        id : req.params.customer_id}
        }).then(toon=> {
        res.send({
            message: "successss delete",
            data :toon
        })
    })
}