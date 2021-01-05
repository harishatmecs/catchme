const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");

const httpStatus = require("./constants/constants");

const Environment = require("./config/env");


const app = express();

let Env = Environment.getEnv();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50MB' }));
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({ status: httpStatus.failure, 'Message': 'Invalid Json. Please try again later' });
    } else {
        next();
    }
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, authtoken, Strict-Transport-Security, x-api-key");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use('/api/ticket', require('./routes/ticket'));

app.get("/", (req, res) => {
    res.status(200).json({ status: httpStatus.success, 'Message': 'Ok' });
});

app.get('*', function (req, res) {
    res.status(404).json({ 'Message': req.method + ' : ' + Env.domainUrl + req.originalUrl + ' does not exist' });
});

const port = process.env.PORT || '8081';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log("***************************************");
    console.log("Running Server on port : " + port);
    console.log("***************************************");
});
