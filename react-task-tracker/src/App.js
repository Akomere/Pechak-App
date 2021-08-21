import React, {useState, useEffect} from "react";
import Header from './components/Header';
import Task from './components/Task';
import AddTask from "./components/AddTask";

function App() {

  const [tasks, setTask] = useState([]);

const[showForm, setShowForm] = useState(false);

useEffect(()=>{

  const getTasks = async ()=>{

    const getTaskFromServer = await fetchData();

    setTask(getTaskFromServer);

    console.log(getTaskFromServer);
  }
  getTasks();

}, [])


// fetch data
const fetchData = async ()=>{
  const resp = await fetch('/tasks');
  const data = await resp.json();
  return data;
  }

  // fetch Single task
  const fetchTask = async (id)=>{
    const resp = await fetch(`/tasks/${id}`);
    const data = await resp.json();
    
    return data;
    }

// delete task
const deleteTask = async (id)=>{
  fetch(`/tasks/${id}`, {
    method: 'DELETE'
  })

  setTask(tasks.filter((task) => task.id !== id))

}

//toggle reminder
const toggleReminder =  async (id) => {

  const myTask = await fetchTask(id);

  

  const update = {...myTask, reminder: !myTask.reminder}

  

  const res = await fetch(`/tasks/${id}`,{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(update)
  })

  const toggleTask = await res.json();

  
  setTask(
    tasks.map((task)=> task.id === id ? {...task, reminder: toggleTask.reminder} : task)
  )
}

// add task
const addTask = async (dtask)=> {

  console.log(dtask);
  const res = await fetch('/tasks',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(dtask)
  });

  
  const mydata = await res.json();
  console.log(mydata);
  
  setTask([...tasks, mydata[0]]);
  console.log(tasks);
  

  // const id = Math.floor(Math.random() * 1000) + 1;

  // const newTask = {id, ...task};

  // setTask([...tasks, newTask]);

  // console.log(task)
}

console.log("rendered " + tasks)
  return (
    <header className="container">
       {/* <h1>Hello Akomere how are {x ? "yuzzes" : "we"} today?</h1> */}
       <Header addState ={showForm} onAdd ={()=> {
  setShowForm(!showForm)} } title ="Task Tracking App"/>
       {showForm && <AddTask list= {tasks} onAdd= {addTask}/>}
       {tasks.length > 0 ? <Task taskin = {tasks} onDelete= {deleteTask} onToggle ={toggleReminder} />: "no tasks"}
       
    </header>
  );
}

export default App;
