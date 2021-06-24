class MatchState {
    constructor(initialState){
        this.stateStages = [initialState];
    }

    reset () {
        this.stateStages = this.stateStages.slice(0)
    }

    solve () {      
        let lastTurn = this.stateStages.slice(-1)[0]
        let isItSolved = lastTurn.solved;
        while(!isItSolved){
            this.oneTurn();
            lastTurn = this.stateStages.slice(-1)[0]
            isItSolved = lastTurn.solved;
        }
    }
    oneTurn () {
        let newState = JSON.parse(JSON.stringify(this.stateStages[this.stateStages.length-1]));

        const applicantIndex = findFirstUnstableApplicant(state);
        if(applicantIndex == -1){
            newState.solved = true;
            return newState;
        }
        const programToCheckIndex = findFirstUnofferedProgram(state, applicantIndex);
        if(programToCheckIndex == -1){
            newState.applicants[applicantIndex].tentativeMatch = "No Match";
            newState.applicants[applicantIndex].stable = true;
        }
        const applicantName = state.applicants[applicantIndex].name;
        const programToCheckName = newState.applicants[applicantIndex].rank[programToCheckIndex].name;
        const programToCheck = newState.programs[programToCheckName];

        const capacity = programToCheck.capacity;
        const admittedCandidatesIndices = findAdmittedCandidates(programToCheck) 
        const currentAdmittedCt = admittedCandidatesIndices.length
        const currentAppIndexInProgram = findCurrentApplicantIndex(programToCheck,applicantName)

        newState.applicants[applicantIndex].rank[programToCheckIndex].offered = true; 
        newState.programs[programToCheckName].rank[currentAppIndexInProgram].offered = true;
        if (currentAdmittedCt < capacity){
            newState.applicants[applicantIndex].tentativeMatch = programToCheckName; 
            newState.applicants[applicantIndex].stable = true;
            newState.applicants[applicantIndex].rank[programToCheckIndex].tentMatch = true;
            newState.programs[programToCheckName].rank[currentAppIndexInProgram].tentMatch = true;
        } else {
            const lowestRankedAdmittedIndex = admittedCandidatesIndices.slice(-1)[0];
            const lowestRankedAdmittedName = programToCheck.rank[lowestRankedAdmittedIndex].name;
            if(lowestRankedAdmittedIndex>currentAppIndexInProgram){
                newState.applicants[applicantIndex].tentativeMatch = programToCheckName; 
                newState.applicants[applicantIndex].stable = true;
                newState.applicants[applicantIndex].rank[programToCheckIndex].tentMatch = true;
                newState.programs[programToCheckName].rank[currentAppIndexInProgram].tentMatch = true;

                let bumpedAppIndex = findAppIndex(state, lowestRankedAdmittedName)
                newState.applicants[bumpedAppIndex].tentativeMatch = ""; 
                newState.applicants[bumpedAppIndex].stable = false;
                let programInAppRankIndex = findProgramInAppRankIndex(newState, bumpedAppIndex, programToCheckName)
                newState.applicants[bumpedAppIndex].rank[programInAppRankIndex].tentMatch = false;
                newState.programs[programToCheckName].rank[lowestRankedAdmittedIndex].tentMatch = false;
            }
        }
        this.stateStages.push(newState);
    }
}


function findFirstUnstableApplicant (state){
    let applicantIndex = 0;
    while(applicantIndex<state.applicants.length){
        if(state.applicants[applicantIndex].stable){
            applicantIndex +=1;
        } else {
            return applicantIndex;
        }
    }
    return -1;
}

function findFirstUnofferedProgram(state, applicantIndex){
    let programIndex = 0; 
    let applicantsRank = state.applicants[applicantIndex].rank
    while(programIndex<applicantsRank.length){
        if(applicantsRank[programIndex].offered){
            programIndex += 1;
        } else {
            return programIndex; 
        }
    }
    return -1
}

function findCurrentApplicantIndex(programToCheck, applicantName){
    let applicantIndex = null;
    for(let i=0; i<programToCheck.rank.length; i++){
        if(programToCheck.rank[i].name == applicantName){
            applicantIndex = i;
        }
    }
    return applicantIndex;  
}

function findAdmittedCandidates(programToCheck){
    let arrOfAdmittedCandidates = [];
    for(let i=0; i<programToCheck.rank.length; i++){
        if(programToCheck.rank[i].tentMatch){
            arrOfAdmittedCandidates.push(i);
        }
    }
    return arrOfAdmittedCandidates;
}

function findAppIndex(state, name){
    let applicantIndex = null;
    for(let i=0; i<state.applicants.length; i++){
        if(state.applicants[i].name == name){
            applicantIndex = i;
        }
    }
    return applicantIndex;  
}

function findProgramInAppRankIndex(state, appIndex, programName){
    let programIndex = null;
    for(let i=0; i<state.applicants[appIndex].rank.length; i++){
        if(state.applicants[appIndex].rank[i].name == programName){
            programIndex = i;
        }
    }
    return programIndex;  
}



// module.exports = MatchState;
module.exports = { 
    MatchState, findFirstUnstableApplicant, findFirstUnofferedProgram, 
    findAdmittedCandidates, findCurrentApplicantIndex, findAppIndex, 
    findProgramInAppRankIndex
}


