var express = require('express');
var request = require('request');
var path = require('path');
var app = express();

app.use(express.json());

app.post('/sendtexts', function(req, res) {
    numbers = req.body.phone.split(",");

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
    }
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/txter.html'))
})

var server = app.listen(2112, '127.0.0.1', function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Boston Area Police Updates listening at http://%s:%s", host, port)
})
