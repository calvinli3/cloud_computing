var grid;
function checkWinner() {
    //horizontals
    if (grid[0] === 'X' && grid[1] === 'X' && grid[2] === 'X') {
        return 'X';
    }
    if (grid[3] === 'X' && grid[4] === 'X' && grid[5] === 'X') {
        return 'X';
    }
    if (grid[6] === 'X' && grid[7] === 'X' && grid[8] === 'X') {
        return 'X';
    }
    //verticals
    if (grid[0] === 'X' && grid[3] === 'X' && grid[6] === 'X') {
        return 'X';
    }
    if (grid[1] === 'X' && grid[4] === 'X' && grid[7] === 'X') {
        return 'X';
    }
    if (grid[2] === 'X' && grid[5] === 'X' && grid[8] === 'X') {
        return 'X';
    }
    //diags
    if (grid[0] === 'X' && grid[4] === 'X' && grid[8] === 'X') {
        return 'X';
    }    
    if (grid[2] === 'X' && grid[4] === 'X' && grid[6] === 'X') {
        return 'X';
    }
    //draw
    if (grid[0] != ' ' && grid[1] != ' ' && grid[2] != ' ' && grid[3] != ' ' && grid[4] != ' ' && grid[5] != ' ' && grid[6] != ' ' && grid[7] != ' ' && grid[8] != ' ') {
        return false;
    }
    return ' ';
}

function updateGrid(gid) {
    if (!isNaN(gid)) {
        if (gid > 0 || gid < 8) {
        if (grid[gid] === ' ') {
            grid[gid] = 'X';
            return grid;
        }
        }
    } // else
    // findLowestNumber
    for (var i = 0; i < grid.length; i++) {
        if (grid[i] === ' ') {
        grid[i] = 'X';
        return grid;
        }
    }
}
$(document).ready(function() {
    // $("div#hellostring").hide();
    // $("div#grid").hide();
    // $("div#boardstate").hide();
    // $("form#nameform").submit(function(event) {
    //     event.preventDefault();
    //     var $form = $(this),
    //     term = $form.find("input[name='name']").val(),
    //     url = $form.attr("action");
    //     $.ajax({
    //         url: url, 
    //         data: JSON.stringify({name: term}),
    //         type: 'POST',
    //         contentType: 'application/json',
    //         success: function(data) {
    //             $("div#formshow").hide();
    //             $("div#hellostring").show();
    //             $("div#grid").show();
    //             $("div#boardstate").show();
    //             $("div#hellostring").text("Hello, " + data.name + ", " + data.date);
    //             grid = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    //         }
    //     });
    // });
    $("form#gridform").submit(function(event) {
        event.preventDefault();
        var $form = $(this),
        term = $form.find("input[name='gid']").val(),
        url = $form.attr("action");
        updateGrid(term);
        var winner = checkWinner();
        if (winner === 'X') {
        alert("you win. yay");
        }
        $.ajax({
            url: url,
            data: JSON.stringify({grid: grid, winner: winner}),
            type: 'POST',
            contentType: 'application/json',
            success: function(data) {
                if (data.winner === 'O') {
                alert("the server won. you must be really stupid");
                }
                grid = data.grid;
                $("div#boardstate").text("Current board is: " + grid);
            },
            error: function(req, err) {
                console.log("error" + err);
            }
        });
    });
});