import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Form,FormGroup,Col,Label,Input,FormText,CardFooter,Button, NavLink, Nav} from 'reactstrap';
import axios from 'axios';
import SuccessAlert from '../../Quizz/Question/successAlert';
import ErrorAlert from '../../Quizz/Question/ErrorAlert';

class Module extends Component {  
    constructor(props){
        super(props);
        this.onchangename = this.onchangename.bind(this);
        this.onsubmit1 = this.onsubmit1.bind(this);
        this.state = {
         name : '',
         alert_msg : ''        
        };
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
            axios.post(`http://localhost:5000/Module/Module`, Module)
            .then(res => {
              this.setState({alert_msg : 'success'})
              console.log(res)
            }).catch(error => {
              this.setState({alert_msg:'error'});
            })
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
                      <Label htmlFor="description">Text of the Question : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="description" name="description" placeholder="Enter description..." autoComplete="description" value={this.state.na} onChange={this.onchangename}/>
                      <FormText className="help-block">Please enter your Question</FormText>
                    </Col>
                  </FormGroup>
                  
                  <CardFooter>
                  <Nav>
              <NavLink><Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button></NavLink>
             
                 </Nav>
               
                  </CardFooter>
                </Form>
              </CardBody> 
            </Card>
        )}}
export default Module;