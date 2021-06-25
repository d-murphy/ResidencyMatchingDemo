// add a random reset
// adjust css for state and match - consider showing visually?
// show system status somewhere
// move buttons up to top
// add a solve button/ 
// show capacity
// add a naration step; 


import './App.css';
import React from 'react';

function App() {

    const [systemStatus, setSystemStatus] = React.useState("Start");
    const [applicants, setApps] = React.useState([]);
    const [programs, setPrgms] = React.useState([]);

    React.useEffect(() => {
      reset();
    }, []);

    const reset = function(){
      fetch("http://localhost:2000/reset")
      .then((res) => res.json())
      .then((data) => {
        setSystemStatus(data.solved);
        setApps(data.applicants);
        setPrgms(Object.values(data.programs));
      })

    }

    const oneTurn = function(){
      fetch("http://localhost:2000/oneStep")
      .then((res) => res.json())
      .then((data) => {
        setSystemStatus(data.solved);
        setApps(data.applicants);
        setPrgms(Object.values(data.programs));
      })
    }

    let applicantList = applicants.map((applicant, i) => {
      return (
              <div key={i} className="applicant-box">
                <div className="app-name">{applicant.name}</div>
                <div className="app-stable">{`Stable state: ${applicant.stable}`}</div>
                <div className="app-status-lable">
                  {systemStatus === false ? "Tentative Match:" : "Match: "}
                </div>
                <div className="app-status">{applicant.tentativeMatch == "" ? "TBD" : applicant.tentativeMatch}</div>
                <div className="app-ranks">{applicant.rank.map(
                  (p,i)=>{
                    return(
                      <div key={i} className={`${applicant.name}${p.offered} applicant-proposed-${p.offered}-acc-${p.tentMatch}`}>
                        {`${i+1}. ${p.name}`}
                      </div>)
                    })}
                </div>
              </div>
             )
    })

    let programsList = programs.map((program, i) => {
      return (
              <div key={i} className="program-box">
                <div className="program-name">{program.name}</div>
                <div className="program-ranks">{program.rank.map(
                  (p,i)=>{
                    return(
                      <div key={i} className={`${p.name}${p.offered} applicant-proposed-${p.offered}-acc-${p.tentMatch}`}>
                        {`${i+1}. ${p.name}`}
                      </div>)
                    })}
                </div>
              </div>
             )
    })



  return (
    <div className="App">
      <div className="applicant-row">
        {applicantList}
      </div>
      <div className="program-row">
        {programsList}
      </div>
      <div className="control-row">
        <button className="button" onClick={oneTurn}>See next</button>
        <button className="button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
