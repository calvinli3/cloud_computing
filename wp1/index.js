var express = require('express');
var router = express.Router();
var path = require('path');

function checkWinner(grid) {
    console.log("checking winner...");
    //horizontals
    if (grid[0] === 'O' && grid[1] === 'O' && grid[2] === 'O') {
      return 'O';
    }
    if (grid[3] === 'O' && grid[4] === 'O' && grid[5] === 'O') {
      return 'O';
    }
    if (grid[6] === 'O' && grid[7] === 'O' && grid[8] === 'O') {
      return 'O';
    }
    //verticals
    if (grid[0] === 'O' && grid[3] === 'O' && grid[6] === 'O') {
      return 'O';
    }
    if (grid[1] === 'O' && grid[4] === 'O' && grid[7] === 'O') {
      return 'O';
    }
    if (grid[2] === 'O' && grid[5] === 'O' && grid[8] === 'O') {
      return 'O';
    }
    //diags
    if (grid[0] === 'O' && grid[4] === 'O' && grid[8] === 'O') {
      return 'O';
    }    
    if (grid[2] === 'O' && grid[4] === 'O' && grid[6] === 'O') {
      return 'O';
    }
    //draw
    if (grid[0] != ' ' && grid[1] != ' ' && grid[2] != ' ' && grid[3] != ' ' && grid[4] != ' ' && grid[5] != ' ' && grid[6] != ' ' && grid[7] != ' ' && grid[8] != ' ') {
      return false;
    }
    return ' ';
}

function addNewEntry(grid) {
    // findLowestNumber
    console.log("adding new entry to grid...");
    for (var i = 0; i < grid.length; i++) {
        if (grid[i] === ' ') {
            grid[i] = 'O';
            return grid;
        }
    }
    return grid;
}

/* GET home page. */
router.get('/ttt', function(req, res) {
  res.render('ttt');
});

//ttt receiving POST: it should render a new page and POST the data to it
router.post('/ttt', function (req, res){
    var name = req.body.name;
    var today = new Date();
    var td = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log("name:"+name);
    console.log("date:"+td);
    res.render('ttt', { name: name });
});

//receive post at /ttt/play
router.post('/ttt/play', function(req, res){
    var newgrid= req.body.grid;
    var newwinner = checkWinner(newgrid);
    addNewEntry(newgrid);
    var data = {grid: req.body.grid, winner: newwinner};
    res.send(data);
});

module.exports = router;