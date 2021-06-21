import './App.css';
import React from 'react';

function App() {

    const [applicants, setApps] = React.useState(null);
    const [programs, setPrgms] = React.useState(null);

  
    React.useEffect(() => {
      fetch("http://localhost:2000/start")
        .then((res) => res.json())
        .then((data) => {
          setApps(data.applicants);
          setPrgms(data.programs)
        })
    }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
