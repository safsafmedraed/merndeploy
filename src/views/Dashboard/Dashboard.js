import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    if(!props.user) {return props.history.push("/login");}

    this.state = {

    };
  }

  render() {
        const {user} = this.props;
        const welcoming= () => {
            const date = new Date();
            if(date.getHours()<12)
            return "Good morning!"
            else if(date.getHours()<19)
            return "Hello!"
            else return "Good evening!"
        }
        const trans = original =>{
            const text = original.replace(/<\/?[^>]+>/ig, " ");
            console.log(text);
            const config = {
                headers: { Authorization: 'Bearer 70c3eeb47dac6b52f80ba4962c1fd037'}
            };
            Axios.post("https://ws.detectlanguage.com/0.2/detect?q="+text,null,config)
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
        }
    if(user)
    return <Fragment>
        <div>
            <h1>{welcoming()} {user.Firstname} {user.Lastname}</h1>
            <button className="btn btn-info" onClick={()=>trans("<p class='csdcsdc'>hello</p>")}> Translate </button>
        </div>
    </Fragment>
    else return null;
    }
}
const stateToProps = state => {
    return {
        user : state.auth.user
    }
  }
export default connect(stateToProps) (Dashboard);
