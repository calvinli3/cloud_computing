var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var path = require('path');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "osuwarii",
    database: "hw7"
});
router.get('/hw7', function(req, res) {
    var club = req.query.club;
    var pos = req.query.pos;
    var query1 = "select * from assists where Club = '" + club + "' AND Pos = '"+pos+"' AND a = (select max(a) from (SELECT * FROM assists WHERE Club = '"+club+"' AND Pos = '"+pos+"')qryalias )";
    var rtn = {club: club, pos: pos, max_assists: 0, player: "", avg_assists: 0};

    getmaxassists(rtn, query1, function(err, rslt){
        if (rslt.length > 1) {
            var maxgs = rslt[0].GS;
            var maxgs_index = 0;
            var ct1 = 0;
            var ct2 = 1;
            while (ct2 < rslt.length) {
                if (rslt[ct1].GS < rslt[ct2].GS) {
                    maxgs = rslt[ct2].GS;
                    maxgs_index = ct2;
                } 
                if (rslt[ct1].GS === rslt[ct2].GS) {
                    if (rslt[ct1].Player < rslt[ct2].Player) 
                        maxgs_index = ct1;
                    else 
                        maxgs_index = ct2;
                }
                ct1++;
                ct2++;
            }
            rtn.max_assists = rslt[maxgs_index].A;
            rtn.player = rslt[maxgs_index].Player;
            var query2 = "SELECT AVG(A) FROM assists WHERE Club = '" + club + "' AND Pos = '" + pos + "'";
            getavgassists(query2, function(err, result){
                rtn.avg_assists = result;
                res.send(rtn);
            });
        } else {
            rtn.max_assists = rslt[0].A;
            rtn.player = rslt[0].Player;
            var query2 = "SELECT AVG(A) FROM assists WHERE Club = '" + club + "' AND Pos = '" + pos + "'";
            getavgassists(query2, function(err, result){
                rtn.avg_assists = result;
                res.send(rtn);
            });
        }
    });
});

function getavgassists(query2, callback) {
    con.query(query2, function (err, result) {
        if (err) throw err;
        callback(err, result[0]['AVG(A)']);
    });
}
function getmaxassists(rtn, query1, callback) {
    con.query(query1, function (err, result) {  
        if (err) throw err;
        console.log("Max Assists Result: ", result);
        callback(err, result);
    });
}
//CREATE TABLE assists (Player VARCHAR(50), Club VARCHAR(5),
//POS VARCHAR(4), GP INT, GS INT, A INT, GWA INT, HmA INT, RdA INT, Aper90min decimal(3, 2));
//UPDATE assists SET player='Nicolás Lodeiro' WHERE player='NicolÃ¡s Lodeiro';

module.exports = router;