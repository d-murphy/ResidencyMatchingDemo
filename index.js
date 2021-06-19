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

    console.log("is it solved?", currentState.oneTurn());

    console.log(currentState.stepsToSolution[0].applicants);
    res.json('test');
});


app.listen(2000);