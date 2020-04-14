import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Form,FormGroup,Col,Label,Input,FormText,CardFooter,Button} from 'reactstrap';
import axios from 'axios';
import SuccessAlert from '../Question/successAlert';
import ErrorAlert from '../Question/ErrorAlert';


class AddQuizz extends Component {
  constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.onchangeclass= this.onchangeclass.bind(this);
        this.onchangetimer=this.onchangetimer.bind(this);
        this.onsubmit=this.onsubmit.bind(this);
        this.state = {
            alert_msg : "",
            classe : "",
            Timer : "",
            Options : [],
            value :[],
            take : [],
            code : '',
            Classes : [],
            Users : [],
            value1 : [],
            take1 : [],
            idd: ''
           
        }
    }
    getQuestion()
    {
        axios.get('http://localhost:5000/Questions/questions')
          .then(res => {
            const Question = res.data;
            this.setState({Options : Question
              });
            console.log(this.state.Options)
          })
    }
    getClasses()
    {
      const id = localStorage.getItem('user1');
      console.log(id)
      axios.get(`http://localhost:5000/users/userid/${id}`)
      .then(res=>{
        this.setState({
          Classes: res.data.Classes
        })
      })
    }
    
    onchangeclass(e){
      this.setState({
        classe: e.target.value
      })
      console.log(this.state.classe)
      const classe = this.state.classe
      axios.get(`http://localhost:5000/users/userclasse/${classe}`)
      .then(res => {
        this.setState({Users: res.data})
      })
      console.log(this.state.Users)
    }
    onchangetimer(e){
      this.setState({
        Timer: e.target.value
      })
    }
    getusers(){
          
          //console.log(this.state.Users)
    }
    componentDidMount() {
        this.getQuestion();
        this.getClasses();
       this.getusers();
      }
    handleChange (e) {

      var options = e.target.options;
      var value = [];
              for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                  value.push(options[i].value);
                }
              }
        this.setState({value: value});
       
              console.log(this.state.value);
              
    }
    handleChange1 (e) {

      var options = e.target.options;
      var value1 = [];
              for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                  value1.push(options[i].value);
                }
              }
        this.setState({value1: value1});
       
              console.log(this.state.value1);
              
    }
      onsubmit(e){
        e.preventDefault();
        
        this.state.value.forEach(element => {
          axios.get(`http://localhost:5000/Questions/questions/${element}`)
            .then(res=> {
              console.log(res);
              this.setState({take: [...this.state.take,res.data]})
            })
        });
        const Quizz = {classe: this.state.classe,
          Question: this.state.take,
          Timer: this.state.Timer
        }
       
          
        
        if(this.state.take.length!==0){
       let exec= axios.post('http://localhost:5000/Quizz/Quizz', Quizz)
            .then(res => {
              this.setState({alert_msg : 'success',
                  value: [],
                  code : res.data.code,
                  idd : res.data._id
                })
                console.log("///////////////////////////")
                this.state.value1.forEach(element => {
                   axios.put(`http://localhost:5000/users/Userquizz/${element}/${this.state.idd}`)
                    .then(res=> {
                      console.log(res);
                      this.setState({take1: [...this.state.take1,res.data]})
                    })
                });
                  console.log(this.state.idd)  
            }).catch(error => {
              this.setState({alert_msg:'error'});
            })        
        }
    }
    render() {
       
        return(
            <Card>
                <CardHeader>{this.state.alert_msg==="success"?<SuccessAlert text={'successfully created, this is the code for this quizz : '+ this.state.code}/>:null}
                {this.state.alert_msg==="error"?<ErrorAlert/>:null}</CardHeader>

                    <Form className="form-horizontal" onSubmit={this.onsubmit}>
                    <CardBody>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description">Class : </Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="select" name="select-select" id="select-select"   onChange={this.onchangeclass}>
                  {
                  this.state.Classes.map((optione,index) => {
                    return <option 
                      key={index}
                      value={optione}>{optione}
                      </option>;
                  })
                }
                      </Input>
                      
                      <FormText className="help-block">Please enter your Class</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="multiple-select">Select Questions</Label>
                    </Col>
                    <Col md="9" xs="12">
                  <Input type="select" name="multiple-select" id="multiple-select" multiple={true}  onChange={this.handleChange}>
                  {
                  this.state.Options.map(optione => {
                    return <option 
                      key={optione.description}
                      value={optione._id}>{optione.description}
                      </option>;
                  })
                }
                      </Input>
                </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="multiple-select1">List of students</Label>
                    </Col>
                    <Col md="9" xs="12">
                  <Input type="select" name="multiple-select1" id="multiple-select1" multiple={true}  onChange={this.handleChange1}>
                  {
                  this.state.Users.map(optione => {
                    return <option 
                      key={optione._id}
                      value={optione._id}>{optione.Firstname}  {optione.Lastname}
                      </option>;
                  })
                }
                      </Input>
                </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="Timer">Timer : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" min="0" id="Timer" name="Timer" placeholder="Enter Timer..." autoComplete="Timer" value={this.state.Timer} onChange={this.onchangetimer}/>
                      <FormText className="help-block">Please enter how much time for this quizz in seconds</FormText>
                    </Col>
                  </FormGroup>
                   
                </CardBody>
                <CardFooter><Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button></CardFooter>
             </Form>
            </Card>
        )
    }


}
export default AddQuizz;