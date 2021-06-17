class MatchState {
    constructor(initialState) { 
        this.stepsToSolution = [initialState];
        this.applicantTurn = 0;
        this.solved = false;
    }; 
    oneTurn = function(){
        if(this.stepsToSolution.length == 0) {
          const nextState = this.stepsToSolution[-1];
          const applicant = nextState.applicants[applicantTurn];
          const applicantsRankings = applianct.rank;
          const programs = nextState.programs;
          for (program in applicantsRankings) {

            //   if (programs[program])
          }
        //   for (let i=0; i<applicant.rank.length; i++){
        //     let programNameToTest = applicant.rank[i];
        //     console.log(programNameToTest)
        //     console.log(this.initialState.programs[programNameToTest].rank)
        //     console.log(applicant.name)
        //     if(this.initialState.programs[programNameToTest].rank.includes(applicant.name)){
        //         nextState.applicants[0].tentativeMatch = programNameToTest;
        //         break;
        //     }
        //   }
        //   this.stepsToSolution.push(nextState);
        // } else {
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
