const express = require('express')
const path = require('path')
const axios = require('axios')
const port = 3003
const newrelic = require('newrelic');


var cluster = require('cluster');
// var express = require('express');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
      // Create a worker
      cluster.fork();
    }
  } else {
    // Workers share the TCP connection in this server
    const app = express()

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    //setup Express Static files
    app.use(express.static(path.join(__dirname,'..','client','dist')))

    //init controller
    const PlaceController = require('./Controller/place.js')
    const UserController = require('./Controller/user.js')

    //init parser
    const parser = require('body-parser')
    app.use(parser.json());

    //init cors
    var cors = require('cors')
    app.use(cors());

    //Places API Calls:
    app.get('/api/places/:zipcode', PlaceController.get);

    //User - API Calls:
    app.get('/api/users/:userid', UserController.get);
    app.post('/api/users', UserController.post);
    // app.patch('/api/users/:placeId', UserController.update)

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}
