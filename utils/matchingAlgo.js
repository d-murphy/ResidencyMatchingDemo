class MatchState {
    constructor(initialState) { 
        this.applicants = initialState.applicants
        this.programs = initialState.programs
        this.stepsToSolution = [initialState];
        this.stepsToSolve = 0;
        this.solved = false;
    }; 
    oneTurn = () => {
        for(let i=0; i<this.applicants.length; i++){
            if(this.applicants[i].stable){
                continue
            } else {
                this.applicants[i].proposalTo(this.programs);
                this.stepsToSolve += 1;
                break; 
            }
        }
        //// need to save state here for persistent data? 
        let stableApplicants = 0;
        for(let i=0; i<this.applicants.length; i++){
            if (this.applicants[i].stable) stableApplicants += 1;     
        }
        if (stableApplicants == this.applicants.length) {
            this.solved = true;
            return true;
        } else {
            return false;
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
