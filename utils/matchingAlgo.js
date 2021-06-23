
class MatchState {
    constructor(initialState) { 
        this.originalApps = JSON.parse(JSON.stringify(initialState.applicants));
        this.orginalPrograms = JSON.parse(JSON.stringify(initialState.programs)); 
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

    solve = () => {
        let solved = false;
        while(!solved){
            this.oneTurn();
            solved = this.solved;
        }
    }

    reset = () => {
        this.applicants = JSON.parse(JSON.stringify(this.originalApps));
        this.programs = JSON.parse(JSON.stringify(this.orginalPrograms));
        this.stepsToSolution = [];
        const newState = {
            applicants: this.applicants,
            programs: this.programs
        };
        this.stepsToSolution.push(newState)
        this.stepsToSolve = 0;
        this.solved = false;
    }
}

module.exports = MatchState;

