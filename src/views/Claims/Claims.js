import React, { Component, Fragment } from 'react';
import {Table , Card, Row, CardBody, Col} from 'reactstrap';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import './style.scss';
import { AppSwitch } from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading';
import logo from '../../../src/growth.svg'



class Claims extends Component {
  
    constructor(props){
        super(props)
        if(props.user) { 
          if(props.user.role)
            if(props.user.role === 'Admin')
              axios.get('http://localhost:5000/claims')
              .then(res => {
                props.loadState(res.data);
                this.setState({loading : false});
              })
              .catch(()=>this.notifyBlock('Oups! something went wrong'));
            else
              props.history.push('/Dashboard');
          else
            props.history.push('/Dashboard');
        }
        else {
          props.history.push("/login");
        }  
      
      this.state = {
            role: 'all',
            filter : "progress",
            block : false,
            search : "",
            activePage: 1,
            loading :true,
            lock : false
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
  const {claims} = this.props;
  const last = this.state.activePage * 10;
  const first = last - 10;
  const lockedClaims = claims.filter(c=> c.lock === true && c.admin === this.props.user._id).length;
  const data =  claims.filter(claim=>this.state.filter === "solved" ? claim.solved : this.state.filter === "progress" ? !claim.solved : true)
  .filter(claim => this.state.filter !== "processed"  ? !claim.lock : claim.admin === this.props.user._id && claim.lock === true)
  .filter(claim => this.state.block === claim.removed)
  .filter(claim => {
      const ch = (claim.user.Firstname + claim.user.Lastname + claim.title + claim.user.email).toLowerCase();
      if(ch.includes(this.state.search.toLocaleLowerCase())) return true
      else return false})
  .filter(claim =>this.state.role === "all"? true : this.state.role === claim.user.role)
  .sort((a,b)=>a.date-b.date);
  const current = data.slice(first, last);
  return (
    <Fragment>
      { !this.state.loading ?
    <div>
    <Card>
      <CardBody>
        <Row>
          <Col md="6">
          <div className="div-radio">
              { !this.state.block ? <Fragment>
                <label style={{fontWeight : "bold"}}>Status</label> &nbsp;
              <label><input className="radio"  type="radio" name="radio" onChange={()=>this.setState({filter : "all" , activePage :1})} value="" />All</label> &nbsp;
              <label><input className="radio" type="radio" name="radio" onChange={()=>this.setState({filter : "solved" , activePage :1})} value={true} />Solved</label> &nbsp;
              <label><input className="radio" defaultChecked={true} type="radio" name="radio" onChange={()=>this.setState({filter : "progress" , activePage :1})} value={false} />In progress</label> &nbsp;
              <label><input className="radio" type="radio" name="radio" onChange={()=>this.setState({filter : "processed" , activePage :1})} value={false} />Being processed ({lockedClaims})</label> 
              &nbsp; </Fragment> : null}
          </div>
          </Col>
          <Col md="3">
            <input type="text" style={{marginTop : "10px"}} className="form-control" value={this.state.search} placeholder="Search" onChange={this.search.bind(this)}/>
          </Col>
          <Col style={{textAlign: "right"}}>
            <div>
              <label style={{fontSize:"30px" , fontWeight: "bold"}}>Blocked</label> &nbsp;
              <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} label onChange={()=>this.setState({block : !this.state.block , filter : "progress" , activePage:1})} checked={this.state.block} />
            </div>
          </Col>        
        </Row>
        <Row>
          <Col md="9">
          <div className="div-radio">
              <label style={{fontWeight : "bold"}}>User role</label> &nbsp;
              <label><input className="radio" defaultChecked={true} type="radio" name="filter" onChange={()=>this.setState({role : "all" , activePage :1})} value="" />All</label> &nbsp;
              <label><input className="radio" type="radio" name="filter" onChange={()=>this.setState({role : "Teacher" , activePage :1})} value={true} />Teacher</label> &nbsp;
              <label><input className="radio"  type="radio" name="filter" onChange={()=>this.setState({role : "Student" , activePage :1})} value={false} />Student</label>
          </div>
          </Col>
          <Col>
              <div  onClick={()=>this.props.history.push('/Claims/stats')} style={{marginLeft : 60}}>
                 <img alt="stats" height="50" width="50 " src={logo}/> <span style={{fontWeight : "bolder" , fontSize:"25px"}}>Statistics</span>
              </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
    { current.length ? <Fragment> <Card>
            <br/>
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center" style={{width : "20%"}}>User</th>
                    <th className="text-center" style={{width : "30%"}}>Title</th>
                    <th className="text-center" style={{width : "15%"}}>E-mail</th>
                    <th className="text-center" style={{width : "20%"}}>Date</th>
                    {this.state.filter === "all" ? <th className="text-center" style={{width : "30%"}}>Status</th> : null }
                    {this.state.role === "all" ? <th className="text-center" style={{width : "30%"}}>User role</th> : null }
                  </tr>
                  </thead>
                  <tbody>
                      {
                          current.map((claim , i) => {
                          return  <tr key={i} onClick={()=>this.props.history.push("/Claims/Claim/"+claim._id)}>
                         {/* <td className="text-center">
                            <div className="avatar">
                              <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                               <span className="avatar-status badge-success"></span> 
                            </div>
                          </td>*/}
                          <td className="text-center">
                        <div>{claim.user.Firstname} {claim.user.Lastname}</div>
                          </td>
                          <td className="text-center">
                            {claim.title}
                          </td>
                          <td className="text-center">
                          <div>{claim.user.email}</div>
                          </td>
                          <td className="text-center">
                          <div>{new Date(claim.date).toLocaleString('en-US')}</div>
                          </td>
                          {this.state.filter === "all" ?  <td className="text-center">
                          <div>{claim.solved ? <div>Solved</div> : <div>In progress</div>}</div>
                          </td> : null}
                          {this.state.role === "all" ?  <td className="text-center">
                          <div>{claim.user.role === "Student" ? <div>Student</div> : <div>Teacher</div>}</div>
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
          /></div> </Fragment>  :  <p> No data found here!</p> } 
        </div> : <LoopCircleLoading  />}
        </Fragment> 
  );
}
}
const stateToProps = state => {
  return {
      claims : state.claims.SuperClaims,
      user : state.auth.user
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
