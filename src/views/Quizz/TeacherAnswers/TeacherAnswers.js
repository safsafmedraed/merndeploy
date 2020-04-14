import React, { Component } from 'react';
import {Table,Progress, Row,Input} from 'reactstrap'
import Axios from "axios";
import { number } from 'prop-types';
class TeacherAnswers extends Component {  
    constructor(props){
      super(props);
      this.onchangeclass= this.onchangeclass.bind(this);
      this.state = {
        teacher : '',
        students : [],
        classe : '',
        classes : []
      }
    }
    getTeacher()
{
  const id = localStorage.getItem('user1');
  console.log(id)
  Axios.get(`http://localhost:5000/users/userid/${id}`)
  .then(res=>{
    this.setState({
     teacher : res.data,
     classes : res.data.Classes
    })
    console.log(this.state.teacher)
  })
}
onchangeclass(e){
  this.setState({
    classe: e.target.value
  })
  console.log(this.state.classe)
  const classe = this.state.classe
  Axios.get(`http://localhost:5000/users/userclasse/${classe}`)
  .then(res => {
    this.setState({students: res.data})
  })
  console.log(this.state.students)
}
componentDidMount(){
  this.getTeacher();
}
  render(){

    return(
      <Row>
      <div>
      <Input type="select" name="select-select" id="select-select"   onChange={this.onchangeclass}>
                  {
                  this.state.classes.map((optione,index) => {
                    return <option 
                      key={index}
                      value={optione}>{optione}
                      </option>;
                  })
                }
                      </Input>
            </div>
            
    <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
    <thead className="thead-light">
    <tr>
      <th className="text-center"><i className="icon-people"></i></th>
      <th>User</th>
      <th className="text-center">Score</th>
      <th className="text-center">Number of quizzs</th>
      <th>Number of quizzs answered</th>
    </tr>
    </thead>
    <tbody>
      {this.state.students.map((student,index) =>
    <tr key={index}>
      <td className="text-center">
        <div className="avatar">
          <img src={student.avatar} className="img-avatar" alt="admin@bootstrapmaster.com" />
          <span className="avatar-status badge-success"></span>
        </div>
      </td>
      <td>
        <div>{student.Firstname} {student.Lastname}</div>
        <div className="small text-muted">
          born : {student.borndate.toString()}
        </div>
      </td>
      <td className="text-center">
        <div>{student.note}</div>
      </td>
      
      <td className="text-center">
      <div>{student.Quizzs.length}</div>
      </td>
       <td>
         <div>{student.answered}</div></td>
        
    </tr>
  )}    
    
    </tbody>
  </Table>
  </Row>
  )
  }

}
export default TeacherAnswers;