const express = require('express');
const morgan = require('morgan');
const MyModule = require('./app.router');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const config = require('./../../config.json')

mongoose.connect(
    'mongodb://' +
    config.mongo.username + ':' +
    config.mongo.password +
    '@node-test-shard-00-00-j7kft.mongodb.net:27017,node-test-shard-00-01-j7kft.mongodb.net:27017,node-test-shard-00-02-j7kft.mongodb.net:27017/test?ssl=true&replicaSet=Node-test-shard-0&authSource=admin'
);
//log action http request from clients 
app.use(morgan('dev'))
//convert data body to json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-type,Accept,Authorization'
    );
    if (req.method == 'OPTION') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT', 'POST', 'GET', 'PATCH', 'DELETE'
        );
        return res.status(200).json({});
    }
    next();
});

app.use('/products', MyModule.productModules);

app.use((req, res, next) => {
    const error = new Error('Not this route');
    error.status = 404;
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({
            error: {
                message: error.message
            }
        });
})
module.exports = app;