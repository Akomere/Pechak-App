
import React from 'react';
import SingleTask from './SingleTask'

const Task = ({taskin, onDelete, onToggle})=> {
 
    return (
        <div>
          
          {taskin.map( (task)=> 

          
        <SingleTask key={task.id} mytask = {task} onDelete={onDelete} onToggle = {onToggle}></SingleTask>)}
        
        </div>
    )
}

export default Task
