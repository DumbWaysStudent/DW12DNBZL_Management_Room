var express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const multer  = require('multer'); 

var app = express()
app.use(bodyParser.json())
const port = Number(process.env.PORT || 5000)


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/img/')
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req,file,cb)=> {
    //reject file
    if(file.mimetype ==='image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else {
        cb(null,false)
    }
}

const upload = multer({storage : storage,limits:{
    fileSize : 2048 * 2048 * 5
}, 
fileFilter : fileFilter
})

//create the homepage route
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public',express.static('public'));

const AuthController = require('./controllers/Auth')
const RoomsController = require('./controllers/Rooms')
const CustomersController = require('./controllers/Customers')
const OrdersController = require('./controllers/Orders')


const { authenticated } = require('./middleware')

app.group("/api/v1", (router) => {
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)

    router.get('/customers', CustomersController.index)
    router.post('/customers', upload.single('image'),CustomersController.store)
    router.put('/customers/:customer_id', upload.single('image'),CustomersController.update)

    router.get('/rooms', RoomsController.index)
    router.post('/rooms', RoomsController.store)
    router.put('/rooms/:room_id', RoomsController.update)

    router.get('/checkin', OrdersController.index)
    router.post('/checkin/room/:room_id', OrdersController.store)
    router.put('/checkout/:order_id', OrdersController.update)
})

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`))