import React from "react";
import { Button} from "reactstrap";
import {Link} from "react-router-dom";
const Result = ({score,total,endquizz})=> (
    <div className="score-board" >
        <div className="score"> you scored {score}/{total}</div>
        <Button className="playBtn" onClick={endquizz}><Link to='/'>Return home</Link></Button>
    </div>
)
export default Result;