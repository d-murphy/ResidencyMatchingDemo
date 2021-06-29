const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initState = require('./utils/defaultState.js')

const MatchState = require('./utils/matchingAlgo.js')
let algoState = new MatchState.MatchState(initState);

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/start', function(req, res){
    res.json(algoState.stateStages[0]);
});

app.get('/reset', function(req, res){
    algoState.reset()
    res.json(algoState.stateStages.slice(-1)[0]);
});

// app.post('/changeInitial', function(req, res){
//     const book = req.body;
// });

app.get('/oneStep', function(req, res){
    algoState.oneTurn();
    res.json(algoState.stateStages[algoState.stateStages.length-1]);
});

app.get('/solve', function(req, res){
    algoState.solve();
    res.json(algoState.stateStages[algoState.stateStages.length-1]);
})

app.listen(2000);