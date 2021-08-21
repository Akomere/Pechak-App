import React from 'react'
import {FaTimes} from 'react-icons/fa' 

function SingleTask({mytask, test, onDelete, onToggle}) {
    return (
        <div className= {`task ${mytask.reminder ? 'reminder' : ''}`} onDoubleClick = {(id) => onToggle(mytask.id)}>
            <h1>{mytask.name} <FaTimes style = {{color: 'blue', cursor: 'pointer'}} onClick={()=>onDelete(mytask.id)}/> </h1>
            <p>
                {mytask.date}
            </p>

            <p>{test}</p>
        </div>
    )
}

export default SingleTask
