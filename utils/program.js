
class Program {

    constructor(name, maxApplicants, applicantRankArr ) { 
        this.name = name;
        this.maxApplicants = maxApplicants;
        this.applicantRank = [];
        this.changeRank(applicantRankArr);
    };

    changeRank = (applicantRankArr) => {
        this.applicantRank = [];
        for (let i=0; i<applicantRankArr.length; i++){
            this.applicantRank.push(
                {applicantName: applicantRankArr[i], triedProposal: false, tentativeMatch: false}
            )
        }
    }; 
    changeMaxApplicants = (newMax) => {
        this.maxApplicants = newMax;
    }

    checkApplicant = (applicantObj) => {
        let applicantsAccepted = 0;
        let applicantAccepted = false;
        for(let i=0; i<this.applicantRank.length; i++){
            if(this.applicantRank[i].applicantName == applicantObj.name){
                this.applicantRank[i].triedProposal = true;
                if(applicantsAccepted < this.maxApplicants){
                    console.log("hitting here?")
                    applicantsAccepted += 1;
                    this.applicantRank[i].tentativeMatch = true;
                    applicantAccepted = true;
                    console.log(applicantAccepted)
                }
            } else {
                if (this.applicantRank[i].tentativeMatch){
                    applicantsAccepted += 1;
                }
                if(applicantsAccepted >= this.maxApplicants){
                    this.applicantRank[i].tentativeMatch = false;
                    applicantObj.removeAcceptance()
                }
            } 
        }
        return applicantAccepted;
    }

};

module.exports = Program;
