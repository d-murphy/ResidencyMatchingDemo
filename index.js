const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const defaultState = require('./utils/defaultState.js');
const MatchState = require('./utils/matchingAlgo.js');
const currentState = new MatchState(defaultState);

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/start', function(req, res){
    res.json(defaultState);
});

app.post('/oneStep', function(req, res){
    const book = req.body;
    currentState.oneTurn();
    console.log("is it solved?", currentState.solved);
    console.log(currentState.stepsToSolution.length)
    res.json(currentState.stepsToSolution[currentState.stepsToSolution.length-1]);
});


app.listen(2000);