const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 

const randomStateGenerator = require('./utils/randomState.js')

const MatchStateClass = require('./utils/matchingAlgo.js')
let matchState; 

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.get('/reset', function(req, res){
    let initState = randomStateGenerator();
    matchState = new MatchStateClass.MatchState(initState);
    res.json(matchState.stateStages.slice(-1)[0]);
});

app.get('/oneStep', function(req, res){
    matchState.oneTurn();
    res.json(matchState.stateStages[matchState.stateStages.length-1]);
});

app.get('/solve', function(req, res){
    matchState.solve();
    res.json(matchState.stateStages[matchState.stateStages.length-1]);
})

app.listen(process.env.PORT || 2000)