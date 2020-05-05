import React from 'react';

/*function time(props){
const Timerr = ({Timer})=> {
    return (
        <h2>{Timer}</h2>
    )
}
}*/
function Timer(props){
    const time=props.Timer;
    if(time>0)
    {
    return <h2>{time}</h2>; 
    }
    else return null;
}
export default Timer;