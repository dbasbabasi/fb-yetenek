var express = require('express');
var router = express.Router();
var http = require('http');
mongoose = require('mongoose');
var app = express();
require('rootpath')();
//The boyd parser helps us to parse body content of the http request object. Actually body-parser is also another middleware function
var bodyParser = require('body-parser');
//by default bodyparser will be used for every request. Extended:false means querystring library will be used to parse query strings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/test', require("controllers/test"));

var config = require('config/config.json');
/*MONGODB_URI = config.MONGODB_URI;
mongoose.connect(MONGODB_URI);
mongoose.connection.on('connected', function (err) {

    console.log('mongo connected');

});*/

/*process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});*/

//creates http server 
http.createServer(app).listen(3000);