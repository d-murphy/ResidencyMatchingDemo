import './App.css';
import React from 'react';

function App() {

    const [applicants, setApps] = React.useState([]);
    const [programs, setPrgms] = React.useState([]);

    React.useEffect(() => {
      start();
    }, []);

    const start = function(){
      fetch("http://localhost:2000/reset")
        .then((res) => res.json())
        .then((data) => {
          setApps(data.applicants);
          setPrgms(Object.values(data.programs));
        })
    }

    const reset = function(){
      fetch("http://localhost:2000/reset")
      .then((res) => res.json())
      .then((data) => {
        setApps(data.applicants);
        setPrgms(Object.values(data.programs));
      })

    }

    const oneTurn = function(){
      fetch("http://localhost:2000/oneStep")
      .then((res) => res.json())
      .then((data) => {
        setApps(data.applicants);
        setPrgms(Object.values(data.programs));
      })
    }

    let applicantList = applicants.map((applicant, i) => {
      return (
              <div key={i} className="applicant-box">
                <div className="app-name">{applicant.name}</div>
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
        <button onClick={oneTurn}>See next</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
