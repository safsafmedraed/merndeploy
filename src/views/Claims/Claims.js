import React, { Component } from 'react';
import faker from 'faker';
import {Table , Card} from 'reactstrap';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";


class Claims extends Component {
  
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
            activePage: 1
        }
    }
    search(e){
        this.setState({
            search : e.target.value , activePage :1
        });
    }
    
    handlePageChange(pageNumber) {
      this.setState({activePage: pageNumber});
    }

render(){
  const {claims} = this.props;
  const last = this.state.activePage * 10;
  const first = last - 10;
  const data =  claims.filter(claim=>this.state.filter === null? true : this.state.filter===claim.solved)
  .filter(claim => {
      const ch = (claim.user + claim.title + claim.email).toLowerCase();
      if(ch.includes(this.state.search.toLocaleLowerCase())) return true
      else return false
  })
  .sort((a,b)=>b.date-a.date);
  const current = data.slice(first, last);
  return (
    <div>
    <Card>
        <form>
            <label><input defaultChecked={true} type="radio" name="fruit" onChange={()=>this.setState({filter : null , activePage :1})} value="" />All</label>
            <label><input type="radio" name="fruit" onChange={()=>this.setState({filter : true , activePage :1})} value={true} />Solved</label>
            <label><input type="radio" name="fruit" onChange={()=>this.setState({filter : false , activePage :1})} value={false} />Not yet</label>
            <input type="text" value={this.state.search} placeholder="Search" onChange={this.search.bind(this)}/>
        </form>
    </Card>
        <Card>
            <br/>
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center"><i className="icon-people"></i></th>
                    <th className="text-center">User</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">E-mail</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                      {
                          current.map((claim , i) => {
                          return  <tr key={i} onClick={()=>this.props.history.push("/Claims/Claim/"+claim.id)}>
                          <td className="text-center">
                            <div className="avatar">
                              <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                              {/* <span className="avatar-status badge-success"></span> */}
                            </div>
                          </td>
                          <td>
                          <div>{claim.user}</div>
                          </td>
                          <td className="text-center">
                            {claim.title}
                          </td>
                          <td>
                          <div>{claim.email}</div>
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
                <div style={{display: "flex",
                            justifyContent: "center",
                            alignItems: "center"}}>
                <Pagination
                prevPageText='prev'
                nextPageText='next'
                firstPageText='first'
                lastPageText='last'
                itemClass="page-item"
                linkClass="page-link"
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={data.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        /></div>
        </div>
  );
}
}
const stateToProps = state => {
  return {
      claims : state.claims.SuperClaims
  }
}
const newState = dispatch =>{
  return {
      loadState : claims =>{
          dispatch({type : "LOAD_STATE_SUPER" , payload : claims})
      }
  }
}
export default connect(stateToProps , newState)(Claims);
