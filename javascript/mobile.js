alert("mobile.js running");
document.getElementById('stdout').innerHTML += "Test";
alert("done adding");

var stdout = document.getElementById('stdout');
var history = document.getElementById('history');

newGame = function () {
    if (document.getElementsByTagName('input')[0].disabled === true) {
        var coll = document.getElementsByTagName('input');
        for (var i=0; i<coll.length; i++) {
            coll[i].disabled = false;
        }
        coll = document.getElementsByTagName('button');
        for (var i=0; i<coll.length; i++) {
            coll[i].disabled = false;
        }
    } else {
        if (!confirm("Reset game and start a new one?")) {
            return false;
        }
    }
    
    stdout.innerHTML += "Game Start!<br />";
    history.innerHTML += "1 1 1 1 1   2-6 <br />";
    stdout.innerHTML += "Game continue, or somethingn!<br />";
};

document.getElementById('newButton').onclick = function(){newGame();};
