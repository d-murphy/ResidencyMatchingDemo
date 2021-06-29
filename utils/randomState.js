const programNames = ['Mercy', 'City', 'General']; 
const applicantNames = ['Arthur', 'Sunny', 'Joseph', 'Latha', 'Darrius']

const getRandomOrder = function (optionsArr) {
    let randomChoices = []
    const optionsArrLength = optionsArr.length;
    for(let i=0; i<optionsArrLength; i++){
        randomChoices.push(Math.floor(Math.random() * optionsArrLength))
    }
    let choicesUnique = Array.from(new Set(randomChoices))
    let returnArr = [];
    for(let i=0; i<choicesUnique.length; i++){
        returnArr.push({name:optionsArr[choicesUnique[i]], offered: false, tentMatch: false})
    }
    return returnArr;
}

const getRandomCapacity = function(){
    let returnInt = Math.random()<.6 ? 2 : 1;
    return returnInt
}

const getRandomState = function () {
    let newState = {
        solved: false, 
        systemMessage: "Applicant and Program rankings are set.  Play the first turn in the matching algorithm or solve to see the end result.",
        applicants: [
            {name: "Arthur", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Sunny", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Joseph", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Latha", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Darrius", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}
        ], 
        programs: {
            "Mercy": {name: "Mercy", capacity: getRandomCapacity(), rank: getRandomOrder(applicantNames)},
            "City": {name: "City", capacity: getRandomCapacity(), rank: getRandomOrder(applicantNames)}, 
            "General": {name: "General", capacity: getRandomCapacity(), rank: getRandomOrder(applicantNames)}
        }
    }
    return newState
}    
module.exports = getRandomState;