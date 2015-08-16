stdout = {
    element: document.getElementById('stdout'),
    write: function(message) {
        stdout.element.innerHTML = message + "<br>\n" + stdout.element.innerHTML;
    },
    clear: function() {
        stdout.element.innerHTML = "";
    }
};

attemptHistory = {
    element: document.getElementById('history'),
    logAttempt: function(attempt) {
        var msg = "";
        for (var i=0; i<attempt.inputs.length; i++) {
            msg += attempt.inputs[i] + " ";
        }
        msg += "&nbsp;&nbsp;&nbsp;" + attempt.response[0] + "-" + attempt.response[1];
        attemptHistory.element.innerHTML += msg + "<br>\n";
    },
    clear: function() {
        attemptHistory.element.innerHTML = "";
    }
};

var newGame = function () {
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
    
    game = new Game();
};

document.getElementById('newButton').onclick = function(){newGame();};
document.getElementById('input').onkeypress = function(){
    var num = event.charCode;
    return (num >= 48 && num <= 57) || num == 8 || num == 13;
}
