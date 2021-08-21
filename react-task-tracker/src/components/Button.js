const Button = (props)=>{
    return <button style= {{backgroundColor: props.color}}  className="btn" onClick={props.click}>{props.text}</button>
}

export default Button