import random
import re

class Game:
    def __init__(self):
        solutionarray = []
        for i in range(5):
            while True:
                n = random.randrange(10)
                if n not in solutionarray:
                    solutionarray.append(n)
                    break
        self.solution = tuple(solutionarray)
        self.history = []
        print("New number chosen.")
    
    def play(self):
        while True:
            guess = input("Guess:")
            try:
                current = Attempt.parseguess(guess)
            #except InputsSizeError:
            #except 
            except UserError: #TODO: specify (more) errors
                print("Please enter only five digits.")
                continue
            current.response = self.processattempt(current)
            print("{}-{}".format(*current.response))
            self.history.append(current)
            if current.response == (5, 5):
                print("You win!")
                break
    
    def processattempt(self, attempt):
        response = [0, 0]
        for i, current in enumerate(attempt.inputs):
            if current in self.solution:
                response[0] += 1
                if current is self.solution[i]:
                    response[1] += 1
        return tuple(response)
        
class Attempt:
    fivenum = re.compile(r"^ *(\d) *(\d) *(\d) *(\d) *(\d) *$")
    
    def __init__(self, inputs, response=[-1,-1]):
        if len(inputs) != 5:
            raise InputsError(inputs) 
        if len(response) != 2:
            raise ResponseError(response)
        self.inputs = tuple(inputs)    # validate numbers and such
        self.response = tuple(response)
    
    @classmethod
    def parseguess(cls, string):
        match = Attempt.fivenum.match(string)
        if match == None:
            raise GuessParseError(string)
        result = list(map(int, match.groups()))
        return cls(result)
        
    def __str__(self):
        msg = "{} {} {} {} {}   {}-{}"
        return msg.format(*(self.inputs + self.response))
        
        
#TODO: move to own script?
class AttemptError(Exception):
    """Errors when making an Attempt instance."""
    pass
    
class InputsError(AttemptError):
    pass

class ResponseError(AttemptError):
    pass

class UserError(Exception):
    """Any exception due to parsing user input."""
    pass

class GuessParseError(UserError):
    """The guess that was input could not be parsed.
    
    Likely due to invalid characters or too many numbers.
    """
    pass
