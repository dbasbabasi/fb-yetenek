
'use strict'

var express = require('express');
var router = express.Router();
var config = require('config/config.json');
const FB_TOKEN = 'EAACenlCJHQIBAGTH1R7ZB9qW08bbbSByS1IWNZBE7xIJ4TICP64kQckTctT4qdd3h9M8uHhBAzBxhs0RnmZB1pTNtscgmdaYa3AZBAsEVBciDQKDM8TOj56O9wxvJC9CXm1g4CzKEY7U65MUXbIXgFP8Vt178zAZAdejZBMPzkYwZDZD'
const FB_VERIFY = 'Softtech2018'


//body parser intialize
var bodyParser = require('body-parser');



router.use(bodyParser.json());

router.get('/', function (request, response, next) {

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
});

module.exports = router;


