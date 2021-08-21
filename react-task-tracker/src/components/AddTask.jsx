import React from 'react'
import {useState} from 'react';


const AddTask = ({onAdd, list}) => {
    const[name, setName] = useState("");
    const[date, setDate] = useState("");
    const[reminder, setReminder] = useState(false);

    //for suggestion handling
    // const [searchText, setSearchText] = useState("");
    const [suggest,setSuggest] = useState([]);
    const [resFound,setResult] = useState(true);

    const handleInput = (e)=>{

        setName(e.target.value);
        console.log(name);

        let searchVal = name;

        let suggestion = [];

        if(searchVal.length > 0){
            suggestion = list.sort().filter((e) => e.name.includes(searchVal.toLowerCase()));
            setResult(suggestion.length !== 0 ? true : false);
        }

        setSuggest(suggestion);
        console.log(suggest)
        
    }

    const suggestedText = (value)=>{

        console.log(value);
        setName(value.name);
        setSuggest([]);

    }

    const displaySuggestion = ()=>{

        if(suggest.length === 0 && name !== "" && !resFound){

            return <p>no suggestions found</p>
        }else{
            return (
            <ul>
            {
                suggest.map((item)=>{
                return(<div key = {item.id}>
                    <li onClick= {()=> suggestedText(item) } style = {{cursor: 'pointer'}}>
                        {item.name}
                    </li>
                    <hr />
                </div>)
            })
            }
            </ul>
        )

        }
    }

    const submitTask = (e)=> {
        e.preventDefault()

        if(!name){

            alert("please add text")
            return
        }

        onAdd({name, date, reminder})

        setName("")
        setDate("")
        setReminder(false)

    }

    

    return (
        <form className="add-form" onSubmit= {submitTask}>

        <div className="form-control" >

        <label >Task</label>
        <input type="text" placeholder="input your task" value={name} onChange={handleInput}/>
        {displaySuggestion()}

        </div>

        <div className="form-control" >

        <label >Time</label>
        <input type="date"
            value={date} onChange={(e)=> setDate(e.target.value)}/>

        </div>

        <div className="form-control-check" >

        <label >Set Reminder</label>
        <input type="checkbox" value={reminder} checked={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>

        </div>

        <input type="submit" value="Save your task"  className= "btn btn-block"/>
            
        </form>
    )
}

export default AddTask
