class MatchState {
    constructor(initialState){
        this.stateStages = [initialState];
    }
    oneTurn () {
        let newState = JSON.parse(JSON.stringify(this.stateStages[this.stateStages.length-1]));
        // for(let i=0; i<newState.applicants.length; i++){
        //     console.log(newState.applicants[i].name, "stable?", newState.applicants[i].stable)
        // }

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
        const admittedCandidatesIndices = findAddmittedCandidates(programToCheck) 
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
            const lowestRankedAdmitted = admittedCandidatesIndices.slice(-1)[0];
            const lowestRankedAdmittedName = programToCheck.rank[lowestRankedAdmitted].name;
            if(lowestRankedAdmitted>currentAppIndexInProgram){
                newState.applicants[applicantIndex].tentativeMatch = programToCheckName; 
                newState.applicants[applicantIndex].stable = true;
                newState.applicants[applicantIndex].rank[programToCheckIndex].tentMatch = true;
                newState.programs[programToCheckName].rank[currentAppIndexInProgram].tentMatch = true;

                let bumpedAppIndex = findAppIndex(state, lowestRankedAdmittedName)

                // need to create function to find lowest ranked index in main applicant state
                // then adjust pieces
            }
        }

        // iff currentAdmittedCt < Capactiy, no problems admit
        // else get index/ranks of addmitted candidates
        // compare to current
        // bump former if higher than current




    //     applicantLoop: 
    //         } else {
    //             let applicant = newState.applicants[i]
    //             let applicantProgramRank = applicant.rank
    //             applicantProgRankLoop:
    //             for(let j=0; j<applicantProgramRank.length; j++){
    //                 if(applicantProgramRank[j].offered){
    //                     continue applicantProgRankLoop
    //                 } else {
    //                     applicantProgramRank[j].offered = true
    //                     let programName = applicantProgramRank[j].name
    //                     let program = newState.programs[programName]
    //                     let countAccepted = 0;
    //                     let programCapacity = program.capacity; 
    //                     programApplicantRankLoop:
    //                     for (let k=0; k<program.rank.length; k++){
    //                         if(program.rank[k].tentMatch){
    //                             countAccepted += 1; 
    //                         }
    //                         if(program.rank[k].name == applicant.name){
    //                             program.rank[k].offered = true;
    //                             if(countAccepted<programCapacity){
    //                                 program.rank[k].tentMatch = true;
    //                                 applicant.stable = true;
    //                                 applicant.tentativeMatch = program.name;
    //                                 applicant.rank[j].tentMatch = true
    //                             } else {
    //                                 program.rank[k].tentMatch = false;
    //                                 applicant.stable = false;
    //                                 applicant.tentativeMatch = "";
    //                                 applicant.rank[j].tentMatch = false;
    //                             }
    //                         }
    //                     }
    //                     break applicantLoop
    //                 }
    //             }
    //             applicant.stable = true;
    //             applicant.tentativeMatch = "No Match";    
    //         }                   
    //     }
    //     if(solved(newState)){
    //         newState.solved = true;
    //     }
    //     this.stateStages.push(newState);
    //     return newState;
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

// module.exports = MatchState;
module.exports = { 
    MatchState, findFirstUnstableApplicant, findFirstUnofferedProgram, 
    findAdmittedCandidates, findCurrentApplicantIndex, findAppIndex
}


// oneTurn () {
//     let newState = JSON.parse(JSON.stringify(this.stateStages[this.stateStages.length-1]));
//     // for(let i=0; i<newState.applicants.length; i++){
//     //     console.log(newState.applicants[i].name, "stable?", newState.applicants[i].stable)
//     // }
//     applicantLoop: 
//     for(let i=0; i<newState.applicants.length; i++){
//         if(newState.applicants[i].stable){
//             continue
//         } else {
//             let applicant = newState.applicants[i]
//             let applicantProgramRank = applicant.rank
//             applicantProgRankLoop:
//             for(let j=0; j<applicantProgramRank.length; j++){
//                 if(applicantProgramRank[j].offered){
//                     continue applicantProgRankLoop
//                 } else {
//                     applicantProgramRank[j].offered = true
//                     let programName = applicantProgramRank[j].name
//                     let program = newState.programs[programName]
//                     let countAccepted = 0;
//                     let programCapacity = program.capacity; 
//                     programApplicantRankLoop:
//                     for (let k=0; k<program.rank.length; k++){
//                         if(program.rank[k].tentMatch){
//                             countAccepted += 1; 
//                         }
//                         if(program.rank[k].name == applicant.name){
//                             program.rank[k].offered = true;
//                             if(countAccepted<programCapacity){
//                                 program.rank[k].tentMatch = true;
//                                 applicant.stable = true;
//                                 applicant.tentativeMatch = program.name;
//                                 applicant.rank[j].tentMatch = true
//                             } else {
//                                 program.rank[k].tentMatch = false;
//                                 applicant.stable = false;
//                                 applicant.tentativeMatch = "";
//                                 applicant.rank[j].tentMatch = false;
//                             }
//                         }
//                     }
//                     break applicantLoop
//                 }
//             }
//             applicant.stable = true;
//             applicant.tentativeMatch = "No Match";    
//         }                   
//     }
//     if(solved(newState)){
//         newState.solved = true;
//     }
//     this.stateStages.push(newState);
//     return newState;
// }
// }
