import './App.css';
import React from 'react';

function App() {

    const [applicants, setApps] = React.useState([]);
    const [programs, setPrgms] = React.useState([]);

    React.useEffect(() => {
      start();
    }, []);

    const start = function(){
      fetch("http://localhost:2000/start")
        .then((res) => res.json())
        .then((data) => {
          setApps(data.applicants);
          setPrgms(data.programs);
        })
        // .then((data) => console.log(data))
      console.log('we tried')
    }

    const reset = function(){
      fetch("http://localhost:2000/reset")
    }

    const oneTurn = function(){
      fetch("http://localhost:2000/oneStep")
      // fetch("http://localhost:2000/oneStep", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify([]),
      // })
      .then((res) => res.json())
      .then((data) => {
        setApps(data.applicants);
        setPrgms(data.programs);
      })
      .then(()=> console.log(applicants))
    }

    let applicantList = applicants.map((applicant, i) => {
      return (
              <div key={i}>
                <div className="appName">{applicant.name}</div>
                <div className="stable">Stable: {"" + applicant.stable}</div>
                <div className="appRanks">{applicant.programRank.map(
                  p=>{
                    return(<div className={"proposedTo"+p.proposedTo}>{p.programName}</div>)
                    })}
                </div>
                <div className="match">{applicant.tentativeMatch}</div>
              </div>
             )
    })

  return (
    <div className="App">
      {applicantList}
      <button onClick={oneTurn}>See next</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
