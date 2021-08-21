import React from 'react' 


function SingleTask({mytask}) {
    return (
        <div>
            <h1> {mytask.name} </h1>
            <p>
                {mytask.date}
            </p>
        </div>
    )
}

export default SingleTask
