 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
// --------------------------------- freeCodeCamp codes ---------------------------------
if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

// --------------------------------- freeCodeCamp codes ---------------------------------

// Respond to all routes, assuming the user can read and use the service
app.use(function(req, res, next){
  // console.log(req.url);
  var strArray = req.url.slice(1).split("%20");
  var object = {"unix": null, "natural":null};
  console.log(strArray);
  var month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  if(isNaN(strArray[0])){    // Request is not a number, convert string to unix timestamp, and copy the natural date back
    object.unix = new Date(strArray.join(" ")).getTime() / 1000;
    object.natural = strArray.join(" ");
  } else {  // Request is a unix timestamp, copy the timestamp in the object, then convert it to natural language form
    var date = new Date(+strArray[0] * 1000);
    object.unix = strArray.toString();
    object.natural = month[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
  }
//   Send back the JSON to the client who requested
  res.status(400);
  res.type("json").send(object);
});
