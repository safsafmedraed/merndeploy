import React, { Component, Fragment } from 'react';
import {Table , Card, CardBody, Row, Col} from 'reactstrap';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import './style.scss'
import axios from 'axios';
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading';
import { toast } from 'react-toastify';




class UserClaims extends Component {
  
    constructor(props){
        super(props)
        if(props.user) {
          axios.get("http://localhost:5000/claims/userClaims/"+props.user._id)
          .then(res => {
            props.loadState(res.data);
            this.setState({loading : false})
          })
          .catch(()=>this.notifyBlock('Oups! something went wrong'));
        }
        else {
          props.history.push("/login");
        }
        this.state = {
            filter : true,
            search : "",
            activePage: 1,
            loading :true
        }
    }
    notifyBlock = msg=> toast.error(msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
    search(e){
        this.setState({
            search : e.target.value , activePage :1
        });
    }
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }


render(){
    document.title = "claims list";
    const {claims} = this.props;
    const last = this.state.activePage * 10;
    const first = last - 10;
    const data =  claims.filter(claim=>this.state.filter === null? true : this.state.filter===claim.solved)
  .filter(claim => {
      const ch = (claim.title).toLowerCase();
      if(ch.includes(this.state.search.toLocaleLowerCase())) return true
      else return false
  })
  .sort((a,b)=>b.date-a.date);
  const current = data.slice(first, last);
  return (
    <Fragment>
    { !this.state.loading ?
    <div>
    <Card>
      <CardBody>
        <Row>
          <Col md="5">
          <div className="div-radio">
              <label><input className="radio"  type="radio" name="radio" onChange={()=>this.setState({filter : null , activePage :1})} value="" />All</label> &nbsp;
              <label><input className="radio" defaultChecked={true} type="radio" name="radio" onChange={()=>this.setState({filter : true , activePage :1})} value={true} />Solved</label> &nbsp;
              <label><input className="radio"  type="radio" name="radio" onChange={()=>this.setState({filter : false , activePage :1})} value={false} />In progress</label>
          </div>
          </Col>
          <Col md="4">
            <input type="text" className="form-control" value={this.state.search} placeholder="Search" onChange={this.search.bind(this)}/>
          </Col> 
          <Col style={{textAlign : "right"}}>
              <button className="btn btn-success" onClick={()=>this.props.history.push("/UserClaims/AddClaim")} >Add claim</button>
          </Col>       
        </Row>
      </CardBody>
    </Card>
       { current.length ? <Fragment> <Card>
            <br/>
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center" style={{width : "50%"}}>Title</th>
                    <th className="text-center" style={{width : "30%"}}>Date</th>
                    {this.state.filter === null ? <th className="text-center" style={{width : "30%"}}>Status</th> : null }
                  </tr>
                  </thead>
                  <tbody>
                      {
                          current.filter(claim=>this.state.filter === null? true : this.state.filter===claim.solved)
                          .filter(claim => {
                              const ch = (claim.title.toLowerCase());
                              if(ch.includes(this.state.search.toLocaleLowerCase())) return true
                              else return false
                          })
                          .sort((a,b)=>b.date-a.date)
                          .map((claim , i) => {
                          return  <tr key={i} onClick={()=>this.props.history.push("/UserClaims/Claim/"+claim._id)}>
                          <td className="text-center">
                            {claim.title}
                          </td>
                          <td className="text-center">
                          <div>{new Date(claim.date).toLocaleString('en-US')}</div>
                          </td>
                          {this.state.filter === null ?  <td className="text-center">
                          <div>{claim.solved ? <div>Solved</div> : <div>In progress</div>}</div>
                          </td> : null}
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
        /></div></Fragment> : <p>No data found here!</p>}
        </div> : <LoopCircleLoading  />} </Fragment>
  );
}
}
const stateToProps = state => {
    return {
        claims : state.claims.UserClaims,
        user : state.auth.user
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