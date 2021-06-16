class MatchState {
    constructor(initialState) { 
        this.initialState = initialState; 
        this.stepsToSolution = [];
        this.solved = false;
    }; 
    oneTurn = function(){
        if(this.stepsToSolution.length == 0) {
          const nextState = this.initialState;
          const applicant = nextState.applicants[0];
          for (let i=0; i<applicant.rank.lenght; i++){
            let programNameToTest = applicant.rank[i];
            console.log(programNameToTest)
            console.log(this.initialState.programs[programNameToTest].rank)
            console.log(applicant.name)
            if(this.initialState.programs[programNameToTest].rank.includes(applicant.name)){
                nextState.applicants[0].tentativeMatch = programNameToTest;
                break;
            }
          }
          this.stepsToSolution.push(nextState);
        } else {
//          const lastStage = this.stepsToSolution[-1] 

        }
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
