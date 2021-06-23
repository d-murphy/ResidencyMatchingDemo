class MatchState {
    constructor(initialState){
        this.stateStages = [initialState];
    }
    oneTurn () {
        let newState = JSON.parse(JSON.stringify(this.stateStages[this.stateStages.length-1]));
        // for(let i=0; i<newState.applicants.length; i++){
        //     console.log(newState.applicants[i].name, "stable?", newState.applicants[i].stable)
        // }
        applicantLoop: 
        for(let i=0; i<newState.applicants.length; i++){
            if(newState.applicants[i].stable){
                continue
            } else {
                let applicant = newState.applicants[i]
                let applicantProgramRank = applicant.rank
                applicantProgRankLoop:
                for(let j=0; j<applicantProgramRank.length; j++){
                    if(applicantProgramRank[j].offered){
                        continue applicantProgRankLoop
                    } else {
                        applicantProgramRank[j].offered = true
                        let programName = applicantProgramRank[j].name
                        let program = newState.programs[programName]
                        let countAccepted = 0;
                        let programCapacity = program.capacity; 
                        programApplicantRankLoop:
                        for (let k=0; k<program.rank.length; k++){
                            if(program.rank[k].tentMatch){
                                countAccepted += 1; 
                            }
                            if(program.rank[k].name == applicant.name){
                                program.rank[k].offered = true;
                                if(countAccepted<programCapacity){
                                    program.rank[k].tentMatch = true;
                                    applicant.stable = true;
                                    applicant.tentativeMatch = program.name;
                                    applicant.rank[j].tentMatch = true
                                } else {
                                    program.rank[k].tentMatch = false;
                                    applicant.stable = false;
                                    applicant.tentativeMatch = "";
                                    applicant.rank[j].tentMatch = false;
                                }
                            }
                        }
                        break applicantLoop
                    }
                }
                applicant.stable = true;
                applicant.tentativeMatch = "No Match";    
            }                   
        }
        if(solved(newState)){
            newState.solved = true;
        }
        this.stateStages.push(newState);
        return newState;
    }
}


function solved(state){
    let solved = true;
    for(let i=0; i<state.applicants.length; i++){
        if(!state.applicants[i].stable){
            solved = false
        }
    }
    return false;
}


//const stateSnapShots = [initState];

// let i=0;
// while(i < 10){
//     stateSnapShots[i+1] = oneTurn(stateSnapShots[i])  
//     i += 1
// }
// stateSnapShots[1] = oneTurn(stateSnapShots[0])
// stateSnapShots[2] = oneTurn(stateSnapShots[1])
// stateSnapShots[3] = oneTurn(stateSnapShots[2])

// console.log("0 state", stateSnapShots[0]);
// console.log("1 state", stateSnapShots[1]);
// console.log("2 state", stateSnapShots[2]);
// console.log("3 state", stateSnapShots[3]);
//console.log("number of its", i)

const proposalTo = () => {
}

const removeAcceptance = () => {

}

const checkApplicant = () => {

}

module.exports = MatchState;

