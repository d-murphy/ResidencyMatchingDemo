
class Program {

    constructor(name, maxApplicants, applicantRankArr ) { 
        this.name = name;
        this.maxApplicants = maxApplicants;
        this.applicantRank = [];
        this._updateRank(applicantRankArr);
    };

    changeRank = (newRank) => {
        this._updateRank(newRank);
    }; 
    changeMaxApplicants = (newMax) => {
        this.maxApplicants = newMax;
    }
    _updateRank = (applicantRankArr) => {
        this.applicantRank = [];
        for (let applicant in applicantRankArr) {
            this.applicantRank.push(
                {applicantName: applicant, triedProposal: false, tentativeMatch: false}
            )
        }
    };
    // add test method here.  return T of F
    checkApplicant = (applicantName) => {

    }

};

module.exports = Program;
