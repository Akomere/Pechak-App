const pool = require("./db");

const express = require("express");



const path = require("path");

const app = express();


const port = process.env.PORT || 3000;

// app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "/react-task-tracker/build")));

if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname, "react-task-tracker/build")))
}

console.log(__dirname);
console.log(path.join(__dirname, "react-task-tracker/build"));


// app.get("/tasks", function(req, res) {

//     res.send({ name: "Hello from task APP server!" });


// });

app.get("/tasks", async (req, res)=> {

  try{
      const newTask = await pool.query("SELECT * FROM tasks");

      res.send(newTask.rows);

  }catch(err){

      console.error(err.message);

  }
})

app.get("/tasks/:id", async (req, res)=> {

    const { id } = req.params;
    try{
        const newTask = await pool.query("SELECT * FROM tasks WHERE id = $1",[id]);
  
        res.send(newTask);
  
    }catch(err){
  
        console.error(err.message);
  
    }
  })

app.post("/tasks", async (req, res)=> {

    try{
        const { name,date,reminder } = req.body;
        
        const newTask = await pool.query("INSERT INTO tasks (name,date,reminder) VALUES ($1,$2,$3) RETURNING *",[name,date,reminder]);

        res.send(newTask.rows);

    }catch(err){

        console.error(err.message);

    }
})

app.delete("/tasks/:id", async (req, res)=> {

    const { id } = req.params;
    try{
        const deleteTask = await pool.query("DELETE FROM tasks WHERE id = $1",[id]);
  
        res.json("deleted");
  
    }catch(err){
  
        console.error(err.message);
  
    }
  })

  app.get("*", (req,res)=>{

    res.sendFile(path.join(__dirname, "react-task-tracker/build/index.html"));
    // alert("invalid url");
  });

app.listen(port, ()=> {
    console.log(`PG-NODE Server listening at port ${port}`);
});