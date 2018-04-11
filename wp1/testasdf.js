var express = require('express');
var router = express.Router();
var path = require('path');
var amqp = require('amqplib/callback_api');

router.post('/speak', function(req, res) {
    var key = req.body.key;
    var msg = req.body.msg;
console.log("key: "+key+", msg: "+msg);
    amqp.connect('amqp://localhost:5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
          var ex = 'hw3';
          ch.assertExchange(ex, 'direct', {durable: false});
          ch.publish(ex, key, new Buffer(msg));
console.log("Sent: ", msg);
        });
    });
});

router.post('/listen', function(req, res) {
    amqp.connect('amqp://localhost:5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var ex = 'hw3';
            var keys = req.body.keys;
            ch.assertExchange(ex, 'direct', {durable: false});
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                for (var i = 0; i < keys.length; i++) {
                    ch.bindQueue(q.queue, ex, keys[i]);
                }
                ch.consume(q.queue, function(msg) {
console.log(" [x] %s", msg.content.toString());
                }, {noAck: true});
            });
        });
    });
});



module.exports = router;