var express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const multer  = require('multer'); 

var app = express()
app.use(bodyParser.json())
const port = Number(process.env.PORT || 5000)
//create the homepage route
app.use(bodyParser.urlencoded({ extended: false }));


const AuthController = require('./controllers/Auth')
const RoomsController = require('./controllers/Rooms')
const CustomersController = require('./controllers/Customers')
const OrdersController = require('./controllers/Orders')


const { authenticated } = require('./middleware')

app.group("/api/v1", (router) => {
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)

    router.get('/customers', CustomersController.index)
    router.post('/customers', CustomersController.store)
    router.put('/customers/:customer_id', CustomersController.update)

    router.get('/rooms', RoomsController.index)
    router.post('/rooms', RoomsController.store)
    router.put('/rooms/:room_id', RoomsController.update)

    router.get('/checkin', OrdersController.index)
    router.post('/checkin', OrdersController.store)
    router.put('/checkin/:order_id', OrdersController.update)
})

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`))