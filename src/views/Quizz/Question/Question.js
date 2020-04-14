import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Form,FormGroup,Col,Label,Input,FormText,CardFooter,Button, NavLink, Nav} from 'reactstrap';
import axios from 'axios';
import SuccessAlert from './successAlert';
import ErrorAlert from './ErrorAlert';

class Question extends Component {  
    constructor(props){
        super(props);
        this.Onchangedesc = this.Onchangedesc.bind(this);
        this.Onchangepoints= this.Onchangepoints.bind(this);
        this.OnchangeCorrect = this.OnchangeCorrect.bind(this);
        this.handlechange= this.handlechange.bind(this);
        this.Onsubmit = this.Onsubmit.bind(this);
        this.state = {
         description : '',
         alternatives : [{text :'', isCorrect :false}],
         Correct : '',
         points :'',
         alert_msg : ''
        };
      } 
      Onchangedesc(e){
          this.setState({
            description : e.target.value
          });
      }
      handlechange(e,index){
        this.state.alternatives[index].text = e.target.value
        //aezaea
        this.setState({alternatives : this.state.alternatives})
      }
      handleremove(index){
        this.state.alternatives.splice(index,1)
        this.setState({alternatives : this.state.alternatives})
      }
      OnchangeCorrect(e)
      {
          this.setState({
              Correct : e.target.value
          });
      }
      addAnswer(){
        const item = { text :"", isCorrect: false}
        this.setState({alternatives : [...this.state.alternatives, item ]})
      }
      Onchangepoints(e)
      {
          this.setState({
              points : e.target.value
          });
      }
            Onsubmit(e)
                {
            e.preventDefault();
             const alternative = {
                text : this.state.Correct,
                isCorrect : true,
            }
           let aa = [...this.state.alternatives,alternative];
            const Question = {
            description : this.state.description,
            alternatives : aa,
            points : this.state.points,
            Correct : this.state.Correct
            };
            axios.post('http://localhost:5000/Questions/questions', Question)
            .then(res => {
              this.setState({alert_msg : 'success'})
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
                <Form onSubmit={this.Onsubmit} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description">Text of the Question : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="description" name="description" placeholder="Enter description..." autoComplete="description" value={this.state.description} onChange={this.Onchangedesc}/>
                      <FormText className="help-block">Please enter your Question</FormText>
                    </Col>
                  </FormGroup>
                  {
                    this.state.alternatives.map((Wronganswer,index)=>{
                      return(
                        <FormGroup row key={index}>
                       <Col md="3">
                      <Label htmlFor="hf-password">Wrong Answer number {index+1} : </Label>
                    </Col>
                    <Col xs="12" md="8">
                    <div className="input-group">
                      <Input id="appendedInputButton" size="16" className="form-control" type="text" placeholder="Answer..." autoComplete="Answer" value={Wronganswer.text} onChange={(e)=>this.handlechange(e,index)}/>
                      <div className="input-group-append">
                        <button className="fa fa-trash" onClick={()=>this.handleremove(index)}></button>
                        </div>
                     <FormText className="help-block">Please enter your Answer</FormText>
                     </div> 
                    </Col>
                  </FormGroup>
                      )
                    })
                  }
                  
                    
                      
                  <Button onClick={(e)=>this.addAnswer(e)} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i>Add answer</Button>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-password">Correct Answer : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="Answer" name="Answer" placeholder="Answer..." autoComplete="Answer" required="true" value={this.state.Correct} onChange={this.OnchangeCorrect}/>
                      <FormText className="help-block">Please enter your Answer</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-password">Points : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="Number" id="Points" name="Points" placeholder="Points..." autoComplete="Points" value={this.state.points} onChange={this.Onchangepoints}/>
                      <FormText className="help-block">Please enter How many points for this Question</FormText>
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
        )}
}
export default Question;