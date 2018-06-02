var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send("Welcome to Express App");
})

http.createServer(app)
    .listen(3000, function (err) {
        if (err) {
            console.log("Couldn't start app server");
            return;
        }
    
        console.log(`Express server started`);
    });