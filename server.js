var express = require('express');
var router = express.Router();
var http = require('http');
mongoose = require('mongoose');
var app = express();
const Bot = require('messenger-bot');
const FB_TOKEN = 'EAACenlCJHQIBAGTH1R7ZB9qW08bbbSByS1IWNZBE7xIJ4TICP64kQckTctT4qdd3h9M8uHhBAzBxhs0RnmZB1pTNtscgmdaYa3AZBAsEVBciDQKDM8TOj56O9wxvJC9CXm1g4CzKEY7U65MUXbIXgFP8Vt178zAZAdejZBMPzkYwZDZD';
const FB_VERIFY = 'Softtech2018';
// Edit these with your tokens




require('rootpath')();
//The boyd parser helps us to parse body content of the http request object. Actually body-parser is also another middleware function
var bodyParser = require('body-parser');
//by default bodyparser will be used for every request. Extended:false means querystring library will be used to parse query strings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/test', require("controllers/test"));
let bot = new Bot({
    token: FB_TOKEN,
    verify: FB_VERIFY
  })
bot.on('error', (err) => {
console.log(err.message)
})

bot.on('message', (payload, reply) => {
    let text = payload.message.text

    bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
        if (err) throw err

        console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
    })
})

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
http.createServer(bot.middleware()).listen(process.env.PORT || 3000);