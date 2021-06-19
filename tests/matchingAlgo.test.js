const defaultState = require('../utils/defaultState.js');
const MatchState = require('../utils/matchingAlgo.js');
const currentState = new MatchState(defaultState);

test('Test default state - applicant array size', () => {
    expect(currentState.applicants.length).toBe(5);
})

// test('Test default state - applicant array size', () => {
//     expect(currentState.oneTurn()).toBe(false);
// })

test('Test default state - applicant array size', () => {
    currentState.solve();
    console.log(currentState.stepsToSolve)
    expect(currentState.solved).toBe(true);
})
