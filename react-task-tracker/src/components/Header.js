import Button from "./Button"

const Header = ({title, onAdd, addState}) => {

    // const clickListen = ()=>{
    //     console.log('clicked!!!')
    // }
    return (
        <div>
        <h1 className="header">{title}</h1>
        <Button color={addState ? 'red' : 'blue'} text={addState ? 'Close' : 'Add'} click={onAdd} />

        </div>

        
        
    )
};

Header.defaultProps =
{
title: "Task Tracker",
};

export default Header
