
class Applicant {
    constructor(name, programRankArr) { 
        this.name = name;
        this.programRank = [];
        this.tentativeMatch = ""
        this.stable = false;
        this.changeRank(programRankArr);
    }; 

    changeRank = (programRankArr) => {
        this.programRank = [];
        for (let i=0; i<programRankArr.length; i++){
            this.programRank.push(
                {programName: programRankArr[i], proposedTo: false}
            )
        }
    }
    proposalTo = (programs) => {
        let programToCheck = '';
        let lastChance = false;
        for (let i=0; i<this.programRank.length; i++){
            if(!this.programRank[i].proposedTo){
                if (i==this.programRank.length-1) lastChance = true;
                this.programRank[i].proposedTo = true;
                programToCheck = this.programRank[i].programName;
                break;
            }
        }
        let outcome = programs[programToCheck].checkApplicant(this)  // add this function in program.js
        console.log("outcome on applicant", outcome)
        if (outcome) {
            this.tentativeMatch = programToCheck;
            this.stable = true; 
        } else if (lastChance) {
            this.tentativeMatch = "No Match";
            this.stable = true;
        }
    }

    removeAcceptance = () => {
        console.log("did this happen in applicant?")
        this.tentativeMatch = ""
        this.stable = false;
    }
    // need a revoke acceptance function;
    
};



module.exports = Applicant;
