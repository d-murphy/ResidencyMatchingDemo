class MatchState {
    constructor(initialState) { 
        this.initialState = initialState; 
        this.stepsToSolution = [];
        this.solved = false;
    }; 
    oneTurn = function(){
        this.stepsToSolution.push("new state")
    };
    solve = function() {
        let x = 0; 
        while(x<5){
            this.oneTurn();
            x += 1;
        }
    }
}

module.exports = MatchState;
