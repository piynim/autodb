var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var routes = require('./routes/userRoutes');
var app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function handler(req, res) {
    res.send("Welcome to Express App");
});
const mongoServer = `mongodb://localhost:27017/User`;



mongoose.connect(mongoServer, function(err, data){
    if(err){
        console.log(err);
    }
    else {
        console.log('Database connected');
    }
})

app.use('/user', routes);
http.createServer(app)
    .listen(port, function (err) {
        if (err) {
            console.log("Couldn't start app server");
            return;
        }
    
        console.log(`Express server started`);
    });