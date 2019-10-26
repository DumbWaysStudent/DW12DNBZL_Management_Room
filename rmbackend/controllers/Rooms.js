const models = require('../models')
const Rooms = models.rooms


const ip = `http://192.168.1.41:5000/`

exports.index = (req, res) => {
    let query
    query = Rooms.findAll({
    })
    query.then(toons=>res.send({
        message : "success",
        data : toons
    }))
}

exports.store = (req, res) => {
    const data ={
        name : req.body.name,
    }
    Rooms.create(data).then(toon=> {
        res.send({
            message: "success",
            data : toon
        })
    })
}

exports.update = (req, res) => {
    const data ={
        name : req.body.name,
    }
    Rooms.update(
        data,
        {where: {id: req.params.room_id}}
    ).then(toon=> {
        res.send({
            message: "success",
            data : toon
        })
    })
}

exports.delete = (req, res) => {
    Rooms.destroy({where: {
        id : req.params.room_id}
        }).then(toon=> {
        res.send({
            message: "successss delete",
            data :toon
        })
    })
}