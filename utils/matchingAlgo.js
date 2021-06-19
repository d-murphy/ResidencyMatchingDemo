class MatchState {
    constructor(initialState) { 
        this.applicants = initialState.applicants
        this.programs = initialState.programs
        this.stepsToSolution = [initialState];
        this.stepsToSolve = 0;
        this.solved = false;
    }; 
    oneTurn = () => {
        let bumpedApplicant = "";
        for(let i=0; i<this.applicants.length; i++){
            if(this.applicants[i].stable){
                continue
            } else {
                bumpedApplicant = this.applicants[i].proposalTo(this.programs);
                this.stepsToSolve += 1;
                break; 
            }
        }
        let stableApplicants = 0;
        for(let i=0; i<this.applicants.length; i++){
            if(this.applicants[i].name == bumpedApplicant){
                this.applicants[i].removeAcceptance();
            }
            if (this.applicants[i].stable) stableApplicants += 1;     
        }
        if (stableApplicants == this.applicants.length) {
            this.solved = true;
        }
        const newState = {
            applicants: this.applicants,
            programs: this.programs
        };
       

        this.stepsToSolution.push(newState)
    };

    solve = function() {
        let solved = false;
        while(!solved){
            this.oneTurn();
            solved = this.solved;
        }
    }
}

module.exports = MatchState;
