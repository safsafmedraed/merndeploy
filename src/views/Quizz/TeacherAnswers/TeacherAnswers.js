import React, { Component } from 'react';
import {Table,Row,Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from "axios";
class TeacherAnswers extends Component {  
    constructor(props){
      super(props);
      this.onchangeclass= this.onchangeclass.bind(this);
      this.state = {
        teacher : '',
        students : [],
        studentsnames: [],
        classe : '',
        classes : [],
        classnames : [],
        questionLink :'/DetailsTeacherAnswers/',
      }
    }
    getTeacher()
    {
      const id = localStorage.getItem('user1');
      console.log(id)
      Axios.get(`http://localhost:5000/users/userid/${id}`)
      .then(res=>{
        this.setState({
          Classes: res.data.Classes
        })
        console.log(res.data)
        this.state.Classes.forEach(element => {
          console.log(element)
          Axios.get(`http://localhost:5000/class/classeid/${element}`)
            .then(res=> {
              console.log(res);
              this.setState({classnames: [...this.state.classnames,res.data]})
            })
        });
      });
      
      
    }
onchangeclass(e){
  this.setState({
    classe: e.target.value
  })
  console.log(this.state.classe)
  const classe = this.state.classe
  this.setState({
    students : []
  })
  Axios.get(`http://localhost:5000/class/classeid/${classe}`)
        .then(res=> {
          this.setState({studentsnames: res.data.Users })
        })
        console.log(this.state.studentsnames)
        this.state.studentsnames.forEach(element => {
          //console.log(element._id)
          let x = element._id
          Axios.get(`http://localhost:5000/users/userid/${x}`)
          .then( res=> {
            console.log(res.data)
            this.setState({students: [...this.state.students,res.data]})
            console.log(this.state.students)
          })
        })
        
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
                  this.state.classnames.map((optione,index) => {
                    return <option 
                      key={index}
                      value={optione._id}>{optione.name}
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
        <div><Link to={this.state.questionLink+student._id}> {student.Firstname} {student.Lastname}</Link></div>
        <div className="small text-muted">
          born : {student.borndate}
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