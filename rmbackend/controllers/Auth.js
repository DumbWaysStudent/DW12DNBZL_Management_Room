const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const models = require('../models')
const Admins = models.admin

exports.login = (req,res) =>{
    const email = req.body.email
    const password = req.body.password
   
    Admins.findOne({where: {email}}).then(admin=>{
        if(admin){
            bcrypt.compare(password, admin.password, function (err, result) {
                if(result == true) {
                    const token = jwt.sign({ userId: admin.id }, 'my-secret-key')
                    res.send({
                        admin,
                        token,
                    }) 
                }
            })
        }else{
            res.send({
                error: true,
                message: "Wrong Email or Password!",
                
            })
        }
    }) 
}

exports.register = (req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password,salt)
    const name = req.body.name //use encryption in real world case!

    Admins.findOne({where: {email: email}}).then(user=>{
        if(user){
            res.send({
                error: true,   
                message: "Email already registered"
            }) 
        }else{
            const data = {
                email : email,
                password : password,
                name : name
            }
            Admins.create(data).then(user => {
                const token = jwt.sign({ userId: user.id }, 'my-secret-key')
                res.send({
                    message: "success",
                    name,
                    token
                })
            })
        }
    }) 
}

exports.index = (req,res) =>{
    Admins.findAll().then(user=>{
        res.send(user)
        })
    
}
