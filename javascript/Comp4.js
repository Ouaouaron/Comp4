function Game(){
    this.solution = new Array(5);
    for (var i=0; i<5; i++) {
        while (true) {
            var candidate = Math.floor(10 * Math.random());
            if (this.solution.indexOf(candidate) == -1) {
                this.solution[i] = candidate;
                break;
            }
        }
    }
    stdout.write("New number chosen.");
    this.history = [];
}
Game.prototype.turn = function(guess) {
    stdout.write(guess);
    
    var current;
    try {
        current = new Attempt(guess);
    } catch (e) {
        stdout.write("Please enter five digits.");
        return;
    }
    stdout.write(current.inputs);
    
    current.response = this.processAttempt(current);
    stdout.write(current.response[0] + "-" + current.reponse[1]);
    self.history[self.history.length] = current;
    attemptHistory.logAttempt(current);
    if (current.response.toString() == [5, 5].toString()) {
        stdout.write("You win!");
    }
}
Game.prototype.play = function() {
    while(true) {
        var guess = prompt("Guess: ");
        var current;
        try {
            current = new Attempt(guess);
        } catch (e) {
            stdout.write("Please enter five digits.");
            continue;
        }
        current.response = this.processAttempt(current);
        stdout.write(current.response[0] + "-" + current.reponse[1]);
        self.history[self.history.length] = current;
        attemptHistory.logAttempt(current);
        if (current.response.toString() == [5, 5].toString()) {
            stdout.write("You win!");
            break;
        }
    }
};
Game.prototype.processAttempt = function(attempt) {
    var response = [0, 0];
    stdout.write(attempt.inputs);
    
    for (var i=0; i<5; i++) {
        if (this.solution.indexOf(attempt.inputs[i]) != -1) {
            response[0]++;
            if (this.solution.indexOf(attempt.inputs[i]) == i) {
                response[1]++;
            }
        }
    }
    stdout.write(response);
    return response;
};

function Attempt(guess) {
    var arrayString = guess.replace(this.rematch, this.rereplace);
    if (!this.retest.test(arrayString)) {
        throw new Error("Guess parse error.");
    } 
    this.inputs = new Array(5);
    for (var i=0; i<5; i++) {
        this.inputs[i] = parseInt(arrayString[i]);
    }
    this.response = [-1, -1];
}
Attempt.prototype.rematch = / *(\d) *(\d) *(\d) *(\d) *(\d) */;
Attempt.prototype.rereplace = '$1$2$3$4$5';
Attempt.prototype.retest = /\d\d\d\d\d/;
Attempt.prototype.toString = function() {
    var result = "";
    for (var i=0; i<5; i++) {
        result += this.inputs[i] + " ";
    }
    result += "  " + this.response[0] + "-" + this.response[1];
    return result;
};
