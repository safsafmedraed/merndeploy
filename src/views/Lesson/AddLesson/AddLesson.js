import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Form,FormGroup,Col,Label,Input,FormText,CardFooter,Button, NavLink, Nav} from 'reactstrap';
import axios from 'axios';
import SuccessAlert from '../../Quizz/Question/successAlert';
import ErrorAlert from '../../Quizz/Question/ErrorAlert';
import { Link } from 'react-router-dom';
class Lesson extends Component {  
    constructor(props){
        super(props);
        this.onchangename = this.onchangename.bind(this);
        this.onchangemodule = this.onchangemodule.bind(this);
        this.onsubmit1 = this.onsubmit1.bind(this);
        this.state = {
         name : '',
         alert_msg : '',
         Module : [],
         cl : [],
         mm : [],
         id : '',
         exist : false,
         questionLink : '/addQuestiontoL/'       
        };
      }
      getModule()
    {
      const id = localStorage.getItem('user1');
      console.log(id)
      axios.get(`http://localhost:5000/users/userid/${id}`)
      .then(res=>{
          console.log(res.data.Modules)
        this.setState({
          Module: res.data.Modules
        })
        console.log(this.state.Module)
      
        this.state.Module.forEach(element => {
         
          axios.get(`http://localhost:5000/Module/Module/${element.modid}`)
            .then(res=> {
              
              this.setState({cl: [...this.state.cl,res.data]})
            })
        })
      });
      

    }
    onchangemodule(e) {
        this.setState({mm: e.target.value})
        console.log(this.state.mm)
    }
      onchangename(e)
      {
          this.setState({ name : e.target.value})
      }
          onsubmit1(e)
          {
            e.preventDefault();
       
            const Module ={
              name : this.state.name,
              
            }
          console.log(Module)
            axios.post(`http://localhost:5000/Lesson/Lesson`, Module)
            .then(res => {
              this.setState({alert_msg : 'success', id : res.data._id})
              axios.put(`http://localhost:5000/Module/addLTo/${this.state.mm}/${res.data._id}`)
                .then(res=> {
                    this.setState({exist:true})
                console.log("yesss")
                })  
            }).catch(error => {
              this.setState({alert_msg:'error'});
            })
           
        }
          componentDidMount(){
              this.getModule();
          }
    render(){
        return(     
        <Card>
              <CardHeader>
                {this.state.alert_msg==="success"?<SuccessAlert text={"successfully added"}/>:null}
                {this.state.alert_msg==="error"?<ErrorAlert text={"something went wrong"}/>:null}
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onsubmit1} className="form-horizontal">
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description">Module : </Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="select" name="select-select" id="select-select"   onChange={this.onchangemodule}>
                  {
                  this.state.cl.map((optione,index) => {
                    return <option 
                      key={index}
                      value={optione._id}>{optione.name}
                      </option>;
                  })
                }
                      </Input>
                      
                      <FormText className="help-block">Please enter your Module</FormText>
                    </Col>
                    </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name of the lesson : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name" placeholder="Enter name..." autoComplete="name" value={this.state.name} onChange={this.onchangename}/>
                      <FormText className="help-block">Please enter the name</FormText>
                    </Col>
                  </FormGroup>
                  
                  <CardFooter>
                  <Nav>
              <NavLink><Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button></NavLink>
                        
                 </Nav>
                 {this.state.exist===true?<Link to={this.state.questionLink+this.state.id}> add a Question to this Lesson</Link> : null }
                  </CardFooter>
                </Form>
              </CardBody> 
            </Card>
        )}}
export default Lesson;