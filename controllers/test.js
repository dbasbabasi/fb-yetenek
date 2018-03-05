
'use strict'

var express = require('express');
var router = express.Router();
var config = require('config/config.json');



//body parser intialize
var bodyParser = require('body-parser');



router.use(bodyParser.json());

router.get('/', function (request, response, next) {
    console.log('Request arrived.');

    var responseData = [];
    responseData.push({ 'response': "dervis bu isi yapar!!!" });
    response.send(responseData);

});

module.exports = router;


