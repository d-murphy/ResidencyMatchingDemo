const matchingAlgo2 = require('../utils/matchingAlgo2.js');
const defaultState = require('../utils/defaultState2.js');


const findFirstUnstableApplicant = matchingAlgo2.findFirstUnstableApplicant;
const findFirstUnofferedProgram = matchingAlgo2.findFirstUnofferedProgram;
const findAdmittedCandidates = matchingAlgo2.findAdmittedCandidates;
const findCurrentApplicantIndex = matchingAlgo2.findCurrentApplicantIndex;
const findAppIndex = matchingAlgo2.findAppIndex;

// findFirstUnstableApplicant

test('Test findFirstUnstableApplicant', () => {
    let state = {}; 
    state['applicants'] = [
        {stable: false}, 
        {stable: false}
    ] 
    expect(findFirstUnstableApplicant(state)).toBe(0);
})


test('Test findFirstUnstableApplicant', () => {
    let state = {}; 
    state['applicants'] = [
        {stable: true}, 
        {stable: false}
    ] 
    expect(findFirstUnstableApplicant(state)).toBe(1);
})

test('Test findFirstUnstableApplicant - all stable', () => {
    let state = {}; 
    state['applicants'] = [
        {stable: true}, 
        {stable: true}
    ] 
    expect(findFirstUnstableApplicant(state)).toBe(-1);
})

// findFirstUnofferedProgram

test('Test findFirstUnofferedProgram', () => {
    expect(findFirstUnofferedProgram(defaultState, 0)).toBe(0);
})

test('Test findFirstUnofferedProgram', () => {
    defaultState.applicants[1].rank[0].offered = true
    expect(findFirstUnofferedProgram(defaultState, 1)).toBe(1);
})

test('Test findFirstUnofferedProgram', () => {
    defaultState.applicants[1].rank[0].offered = true
    defaultState.applicants[1].rank[1].offered = true
    expect(findFirstUnofferedProgram(defaultState, 1)).toBe(-1);
})

// findAdmittedCandidates

test('Test findCurrentAdmittedCt', () => {
    let programToCheck = defaultState.programs['City']; 
    expect(findAdmittedCandidates(programToCheck).length).toBe(0);
})

test('Test findCurrentAdmittedCt', () => {
    let programToCheck = defaultState.programs['City']; 
    programToCheck.rank[0].tentMatch = true
    programToCheck.rank[3].tentMatch = true
    expect(findAdmittedCandidates(programToCheck)[1]).toBe(3);
})

// findCurrentApplicantIndex

test('Test findCurrentApplicantIndex', () => {
    let programToCheck = defaultState.programs['Mercy']
    let applicantName = "Joseph";
    expect(findCurrentApplicantIndex(programToCheck, applicantName)).toBe(1);
})

test('Test findCurrentApplicantIndex', () => {
    let programToCheck = defaultState.programs['Mercy']
    let applicantName = "Latha";
    expect(findCurrentApplicantIndex(programToCheck, applicantName)).toBe(null);
})

//findAppIndex

test('Test findApplicantIndex', () =>{
    let state = {}; 
    state['applicants'] = [
        {name: 'Latha'}, 
        {name: 'Arthur'}
    ] 
    expect(findAppIndex(state,'Arthur')).toBe(1)
})

test('Test findApplicantIndex', () =>{
    let state = {}; 
    state['applicants'] = [
        {name: 'Latha'}, 
        {name: 'Arthur'}
    ] 
    expect(findAppIndex(state,'Joseph')).toBe(null)
})