const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const defaultState = require('./utils/defaultState.js');
// const MatchState = require('./utils/matchingAlgo.js');
const initState = require('./utils/defaultState2.js')
const MatchState = require('./utils/matchingAlgo2.js')
let algoState = new MatchState(initState);

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/start', function(req, res){
    res.json(algoState.stateStages[0]);
});

app.get('/reset', function(req, res){
    currentState.reset()
    res.json(algoState.stateStages.slice(-1)[0]);
});

app.post('/changeInitial', function(req, res){
    const book = req.body;
    // algoState.oneTurn();
    // console.log("is it solved?", algoState.stateStages[algoState.stateStages.length-1].solved);
    // console.log(algoState.stateStages.length)
    // res.json(algoState.stateStages.slice(-1)[0]);

    // currentState.oneTurn();
    // console.log("is it solved?", currentState.solved);
    // console.log(currentState.stepsToSolution.length)
    // res.json(currentState.stepsToSolution[currentState.stepsToSolution.length-1]);
});

app.get('/oneStep', function(req, res){
    algoState.oneTurn();
    res.json(algoState.stateStages[algoState.stateStages.length-1]);
});



app.listen(2000);