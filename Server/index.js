// request Modules from node.js
const express = require('express');
const storageRoutes = require('./routes/storage-routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require("cors");
const session = require('express-session');
const path = require('path');
const errorHandler = require('errorhandler');
const keys = require('./configs/keys');
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const itemRoutes = require("./routes/item-routes");
const orderRoutes = require("./routes/order-routes");
const commentRoutes = require("./routes/comment-routes")


//set up express app
const app = express();

// set up view engine
app.set("view engine", 'ejs');


// configure the app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Build the DB connection
mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log("connected to the database");
});
mongoose.Promise = global.Promise;


/*
Use the middle ware that we created 
*/
app.use(bodyParser.json());

//  routers
app.use('/storages',storageRoutes);
app.use('/users',userRoutes);
app.use('/auth', authRoutes);
app.use('/item', itemRoutes);
app.use('/order', orderRoutes);
app.use('/comment', commentRoutes);


// error handling 
app.use((err, req, res, next)=>{
    res.status(422).send({
        error: err.message,
    })
})

/*
listen for requests
either on env.port or 4000
*/
app.listen(process.env.port || 4000, function(){
    console.log("Now listening for requests on port 3000")
})


