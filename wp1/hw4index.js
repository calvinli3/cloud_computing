var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/deposit', function(req, res) {
    res.send({status: 'OK'});

});

router.get('/retrieve', function(req, res) {
    var key = req.body.key;
    var msg = req.body.msg;	
    res.send({status: 'OK'});
});

module.exports = router;