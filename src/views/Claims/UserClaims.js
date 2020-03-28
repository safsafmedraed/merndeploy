import React, { Component } from 'react';
import faker from 'faker';
import {Table , Card} from 'reactstrap';
import {connect} from 'react-redux';



class UserClaims extends Component {
  
    constructor(props){
        super(props)
        if(!props.claims.length) {
            let list = [];
            for(let i=0;i<50;i++){
                const item = {
                    id : faker.random.uuid(),
                    title : faker.lorem.sentence(),
                    description : faker.lorem.paragraph(),
                    response : faker.lorem.paragraph(),
                    user : faker.name.findName(),
                    email : faker.internet.email(),
                    solved : faker.random.number(1) ? true : false ,
                    date : faker.date.past(10)
                }
                list = [...list,item];
            }
            props.loadState(list);
            
        } 
        this.state = {
            filter : null,
            search : "",
        }
    }
    search(e){
        this.setState({
            search : e.target.value 
        });
    }
    


render(){
    const {claims} = this.props;
  return (
    <div>
    <Card>
        <form>
            <label><input defaultChecked={true} type="radio" name="fruit" onChange={()=>this.setState({filter : null})} value="" />All</label>
            <label><input type="radio" name="fruit" onChange={()=>this.setState({filter : true})} value={true} />Solved</label>
            <label><input type="radio" name="fruit" onChange={()=>this.setState({filter : false})} value={false} />Not yet</label>
            <input type="text" value={this.state.search} placeholder="Search" onChange={this.search.bind(this)}/>
        </form>
    </Card>
        <Card>
            <br/>
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center">Title</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                      {
                          claims.filter(claim=>this.state.filter === null? true : this.state.filter===claim.solved)
                          .filter(claim => {
                              const ch = (claim.user + claim.title + claim.email).toLowerCase();
                              if(ch.includes(this.state.search.toLocaleLowerCase())) return true
                              else return false
                          })
                          .sort((a,b)=>b.date-a.date)
                          .map((claim , i) => {
                          return  <tr key={i} onClick={()=>this.props.history.push("/UserClaims/"+claim.id)}>
                          <td className="text-center">
                            {claim.title}
                          </td>
                          <td className="text-center">
                          <div>{claim.date.toLocaleString()}</div>
                          </td>
                          <td>
                            {claim.solved ? "solved" : "not yet"}
                          </td>
                        </tr>
                          }
                          )
                      }
                  </tbody>
                </Table>
                <br/>
                </Card>
        </div>
  );
}
}
const stateToProps = state => {
    return {
        claims : state.claims.UserClaims
    }
}
const newState = dispatch =>{
    return {
        loadState : Userclaims =>{
            dispatch({type : "LOAD_STATE" , payload : Userclaims})
        }
    }
}
export default connect(stateToProps , newState)(UserClaims);