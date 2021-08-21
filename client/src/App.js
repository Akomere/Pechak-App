import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SingleTask from './SingleTask'

function App() {
  const [tasks, setTask] = React.useState([]);

  React.useEffect(() => {
    // fetch("/api")
    //   .then((res) => res.json())
    //   .then((tasks) => setTask(tasks.message));

      const fetchData = async ()=>{
        const resp = await fetch('/tasks');
        // console.log(resp);
        const data = await resp.json();
        // const dataFromServer = await fetchData();
        // const newData = await dataFromServer;

        setTask(data);
        
        }

        fetchData();
        
  }, []);

   

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!tasks ? "Hold..." : "Tasks are given below"}</p>
      </header>

      <div>     
          {tasks.map( (task)=> (

        <SingleTask key= {task.id} mytask = {task}></SingleTask>))}
        
        </div>
    </div>
  );
}

export default App;