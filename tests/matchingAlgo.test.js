const defaultState = require('../utils/defaultState.js');
const MatchState = require('../utils/matchingAlgo.js');
const currentState = new MatchState(defaultState);

test('Test default state - applicant array size', () => {
    expect(currentState.initialState.applicants.length).toBe(5);
})

test('Test default state - program array size', () => {
    expect(currentState.initialState.programs.length).toBe(3);
})