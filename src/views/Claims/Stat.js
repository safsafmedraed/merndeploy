import React , { Component } from "react";
import Axios from "axios";

class Stat extends Component{

    constructor(props){
        super(props);
        setInterval(() => {
        }, 5000);
        Axios.get("http://localhost:5000/claims/admin/stat").then(stat=>console.log(stat.data));
    }

    render(){
        return <h1>Bonjour!</h1>
    }
}

export default Stat;