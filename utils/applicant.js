
class Applicant {
    constructor(name, programRankArr) { 
        this.name = name;
        this.programRank = [];
        this.tentativeMatch = ""
        this.stable = false;
        this._updateRank(programRankArr);
    }; 
    changeRank = (newRank) => {
        this._updateRank(newRank)
    }
    proposalTo = (programs) => {
        let programToCheck = '';
        let lastChance = false;
        for (let i=0; i<this.programRank.length; i++){
            if(!this.programRank[i].proposedTo){
                if (i==this.programRank.length-1) lastChance = true;
                this.programRank[i].proposedTo = true;
                programToCheck = this.programsRank[i].name;
                break;
            }
        }
        let outcome = programs[programToCheck].checkApplicant(this.name)  // add this function in program.js
        if (outcome) {
            this.tentativeMatch = programToCheck;
            this.stable = true; 
        } else if (lastChance) {
            this.tentativeMatch = "No Match";
            this.stable = true;
        }
    }
    _updateRank = (programRankArr) => {
        this.programRank = [];
        for (let program in programRankArr) {
            this.programRank.push(
                {programName: program, proposedTo: false}
            )
        }
    }
    
};



module.exports = Applicant;
