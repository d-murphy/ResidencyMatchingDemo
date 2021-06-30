// work on the random start
// create an env file and change localhost clicks to env vars in prep for heroku url 

import './App.css';
import React from 'react';

function App() {

    const [systemStatus, setSystemStatus] = React.useState("Start");
    const [systemMessage, setSystemMessage] = React.useState("");
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
        setSystemMessage(data.systemMessage);
        setApps(data.applicants);
        setPrgms(Object.values(data.programs));
      })

    }

    const oneTurn = function(){
      fetch("http://localhost:2000/oneStep")
      .then((res) => res.json())
      .then((data) => {
        setSystemStatus(data.solved);
        setSystemMessage(data.systemMessage);
        setApps(data.applicants);
        setPrgms(Object.values(data.programs));
      })
    }

    const solve = function (){
      fetch("http://localhost:2000/solve")
      .then((res) => res.json())
      .then((data) => {
        setSystemStatus(data.solved);
        setSystemMessage(data.systemMessage);
        setApps(data.applicants);
        setPrgms(Object.values(data.programs));
      })   
    }

    let applicantList = applicants.map((applicant, i) => {
      return (
              <div key={i} className={`applicant-box applicant-stable-${applicant.stable} applicant-match-${applicant.tentativeMatch}`}>
                <div className="app-name">{applicant.name}</div>
                <div className="app-ranks">{applicant.rank.map(
                  (p,i)=>{
                    return(
                      <div key={i} className={`${applicant.name}${p.offered} applicant-proposed-${p.offered}-acc-${p.tentMatch}`}>
                        {`${i+1}. ${p.name}`}
                      </div>)
                    })}
                </div>
                <div className="space-filler"></div>
                <div className="app-match">
                  <div className="app-status-label">
                    {systemStatus === false ? "Tentative Match:" : "Final Match: "}
                  </div>
                  <div className="app-status">{applicant.tentativeMatch === "" ? "TBD" : applicant.tentativeMatch}</div>
                </div>
              </div>
             )
    })

    let programsList = programs.map((program, i) => {
      return (
              <div key={i} className="program-box">
                <div className="program-name">{program.name}</div>
                <div className="program-capcity">Program Capacity: {program.capacity}</div>
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
      <div className="heading"><h1>A Demo of the Medical Resident Match Algorithm</h1></div>
      <div className="sub-heading">
        The National Resident Match Program uses a version of the&nbsp;
        <a href="https://en.wikipedia.org/wiki/Stable_marriage_problem">stable matching algorithm</a> 
        &nbsp;to pair medical residency applicants with available positions. 
        This page demonstrates the stages of the algorithm, similar to&nbsp; 
        <a href="https://www.nrmp.org/matching-algorithm/">this video</a> on the NRMP site.  
      </div>
      <div className="system-message-and-controls">
        <div className="system-message">
          <b>Match Status: </b>{systemMessage}
        </div>
        <div className="space-filler"></div>
        <div className="control-row">
          <button className={`button disable-${systemStatus}`} onClick={oneTurn}>Play Next Turn</button>
          <button className={`button disable-${systemStatus}`} onClick={solve}>Complete the Match</button>
          <button className="button" onClick={reset}>Reset and Randomize</button>
        </div>
      </div>
      <div className="applicant-heading"><h2>Applicants</h2></div>
      <div className="applicant-row">
        {applicantList}
      </div>
      <div className="program-heading"><h2>Programs</h2></div>
      <div className="program-row">
        {programsList}
      </div>

    </div>
  );
}

export default App;
