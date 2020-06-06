var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendtexts', function(req, res) {
    let numbers = req.body.phone.split(",");

    for (var i = 0; i < numbers.length; i++) {
        request.post('https://textbelt.com/text', {
            form: {
                phone: numbers[i],
                message: req.body.message,
                key: req.body.key,
            },
        }, (err, httpResponse, body) => {
            console.log(JSON.parse(body));
        });
    };

    res.send()
});

app.get('/status/:key', function(req, res) {
    let key = req.params.key;

    request.get('https://textbelt.com/quota/' + key,
        (err, httpResponse, body) => {
            let remaining = JSON.parse(body);
            res.send(remaining);
        });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/txter.html'))
})

var server = app.listen(2112, '127.0.0.1', function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Boston Area Police Updates listening at http://%s:%s", host, port)
})
