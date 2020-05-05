import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Form,FormGroup,Col,Label,Input,FormText,CardFooter,Button} from 'reactstrap';
import axios from 'axios';
import SuccessAlert from '../Question/successAlert';
import ErrorAlert from '../Question/ErrorAlert';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
class AddQuizz extends Component {
  constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.onchangeclass= this.onchangeclass.bind(this);
        this.onchangetimer=this.onchangetimer.bind(this);
        this.onchangename=this.onchangename.bind(this);
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
            ss : [],
            Users : [],
            value1 : [],
            take1 : [],
            idd: '',
            cl : [],
            name : []
           
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
        console.log(this.state.Classes)
        this.state.Classes.forEach(element => {
          console.log(element)
          axios.get(`http://localhost:5000/class/classeid/${element}`)
            .then(res=> {
              console.log(res);
              this.setState({cl: [...this.state.cl,res.data]})
            })
        });
      });
      
      
    }
    
    onchangeclass(e){
      this.setState({
        classe: e.target.value
      })
     // console.log(this.state.classe)
      const classe = this.state.classe
      this.setState({
        Users : []
      })
      axios.get(`http://localhost:5000/class/classeid/${classe}`)
            .then(res=> {
              this.setState({ss: res.data.Users })
            })
            console.log(this.state.ss)
            this.state.ss.forEach(element => {
              //console.log(element.user)
              let x = element._id
              axios.get(`http://localhost:5000/users/userid/${x}`)
              .then( res=> {
                console.log("id :"+res.data._id)
                this.setState({Users: [...this.state.Users,res.data]})
                console.log(this.state.Users)
              })  
            })
            
    }
    onchangetimer(e){
      this.setState({
        Timer: e.target.value
      })
    }
    onchangename(e){
      this.setState({
        name: e.target.value
      })
    }
  
    componentDidMount() {
        this.getQuestion();
        this.getClasses();
       //this.getclassnames();
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
       
              //console.log(this.state.value);
              
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
       
             // console.log(this.state.value1);
              
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
        const Quizz = {name : this.state.name,
          classe: this.state.classe,
          Question: this.state.take,
          Timer: this.state.Timer,
       
        }
       
          
        
        if(this.state.take.length!==0){
      axios.post('http://localhost:5000/Quizz/Quizz', Quizz)
            .then(res => {
              this.setState({alert_msg : 'success',
                  value: [],
                  code : res.data.code,
                  idd : res.data._id
                })
               
                this.state.value1.forEach(element => {
                 
                   axios.put(`http://localhost:5000/users/Userquizz/${element}/${this.state.idd}`)
                    .then(res=> {
                     
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
               <div className="container"><ReactNotification/></div>
                <CardHeader>{this.state.alert_msg==="success"?<SuccessAlert text={'successfully created, this is the code for this quizz : '+ this.state.code}/>:null}
                {this.state.alert_msg==="error"?<ErrorAlert/>:null}</CardHeader>
                <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="Timer">Quizz name : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" min="0" id="name" name="name" placeholder="Enter name..." autoComplete="name" value={this.state.name} onChange={this.onchangename}/>
                      <FormText className="help-block">Please enter a name for this quizz</FormText>
                    </Col>
                  </FormGroup>
                    <Form className="form-horizontal" onSubmit={this.onsubmit}>
                    <CardBody>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description">Class : </Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="select" name="select-select" id="select-select"   onChange={this.onchangeclass}>
                  {
                  this.state.cl.map((optione,index) => {
                    return <option 
                      key={index}
                      value={optione._id}>{optione.name}
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