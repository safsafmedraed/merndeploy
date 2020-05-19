import {connect} from "react-redux";
import React, {Fragment, useEffect,useState} from "react";
import Alert from "../../actions/alerts";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Spinner from "../Theme/Spinner";
import { GETALLCLASSES ,getstudentsnotaff ,affectstudent} from '../../actions/classe'
import PropTypes from "prop-types";


const   AffectSC  =({ affectstudent, getstudentsnotaff  , GETALLCLASSES ,history, classe:{ classes,loading,students } }) => {



  useEffect(() => {
    GETALLCLASSES();
    getstudentsnotaff();
  }, [GETALLCLASSES,getstudentsnotaff])
  const [formData, setFormData] = useState({
    classid: '',

  })


  const  {classid}  = formData;
  const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  let selected=[];

  const onChange = function(event) {
    let options = event.target.options;
    let formdata1 = [];

    if (options) {
      for (let x = 0; x < options.length; x++) {
        if (options[x].selected) {
          formdata1.push(options[x].value);
         // console.log(formdata1)

        }
      }
      selected=formdata1;
      return selected;
       }
    }
  const onsubmit=async e =>{
    e.preventDefault();
    selected.forEach(e=>{
      console.log("aaa"+e)
        affectstudent(formData,e,history )

      }

    )
  }



  return <Fragment>             {loading ? <Spinner /> : <Fragment>

    <Alert/>


    <Col xs="24" md="12">
      <Card>

        <Form  className="form-horizontal" onSubmit={e=>onsubmit(e)}>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="multiple-select">Select Class</Label>
            </Col>
            <Col md="9" xs="12">
              <RadioGroup  name="customized-radios" onChange={e=>onchange(e)} >
                {classes.length >0 ?(
                  classes.map(classe =>{
                    return( <FormControlLabel
                        key={classe._id}
                        value={classe._id}
                        control={<Radio />}
                        label={classe.name}
                        name="classid"
                      />
                    )
                  })): <h4>No classes Found</h4>
                }
              </RadioGroup>
            </Col>
          </FormGroup>

          <CardHeader>
            <i className="fa fa-align-justify"></i> List Of Students
          </CardHeader>
          <CardBody>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="multiple-select">Student Not Affected</Label>
              </Col>
              <Col md="9" xs="12">
                <Input type="select" id="multiple-select" multiple={true}  name="studentid"  onChange={e=>onChange(e)} >
                  { students.map(optione =>{
                    return (<option
                        key={optione._id}
                        value={optione._id}>{optione.Firstname}     {optione.Lastname}
                      </option>
                    )}
                  )
                  }
                </Input>
              </Col>
            </FormGroup>

          </CardBody>
          <Button type="submit" size="sm" color="success"    block><i className="fa fa-ban"></i> AFFECT</Button>
          <Button type="reset" size="sm" color="danger"block><i className="fa fa-ban"></i> CANCEL</Button>

        </Form>

      </Card>
    </Col>





  </Fragment>}
  </Fragment>

}
AffectSC.propTypes = {
  GETALLCLASSES: PropTypes.func.isRequired,
  affectstudent: PropTypes.func.isRequired,
  getstudentsnotaff: PropTypes.func.isRequired,
  classe: PropTypes.object.isRequired,


}
const mapStateToProps = state => ({
  classe: state.classe,

})

export default connect(mapStateToProps, { affectstudent, getstudentsnotaff , GETALLCLASSES })(AffectSC);













/*

import React, {Component, Fragment } from 'react';
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class  AffectSC extends Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);

     this.onsubmit = this.onsubmit.bind(this);
    this.state = {
      classe: '',
      classes : [],
      students :[],
      value:[],
      alert_msg : ''
    };
  }
  getclasses()
  {
    axios.get('http://localhost:5000/class/Getall')
      .then(res => {
        const Cl = res.data;
        this.setState({classes : Cl
        });
        console.log(this.state.classes)
      })
  }
  getstudents()
  {
    axios.get('http://localhost:5000/class/notaff')
      .then(res => {
        const notaf = res.data;
        this.setState({students : notaf
        });
        console.log(this.state.students)
      })
  }
  componentDidMount() {
    this.getclasses();
    this.getstudents()
  }
  handleChange1 (e) {

    this.setState({
      classe: e.target.value
      }
    );

    console.log(this.state.value);

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

  onsubmit(e){
    e.preventDefault();
    if(this.state.value.length!==0){
      this.state.value.forEach(element => {
        axios.post(`http://localhost:5000/class/affect/${this.state.classe}/${element}`)
          .then(res=> {
            console.log(res);
            this.setState({alert_msg: 'success'})
          })



        })
    }
    this.props.history.push('/Listclasses');
  }




  render(){
    return( <Fragment>
        <Col xs="24" md="12">
          <Card>

            <CardBody>
              <Form onSubmit={this.onsubmit} className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="multiple-select">Select Class</Label>
                  </Col>
                  <Col md="9" xs="12">
                    <RadioGroup  name="customized-radios" onChange={this.handleChange1} >
                      {
                        this.state.classes.map((l,index)=>{
                          return <FormControlLabel
                              key={index}
                         value={l._id}
                              control={<Radio />}
                              label={l.name}
                          />

                        })
                      }
                    </RadioGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="multiple-select">Student Not Affected</Label>
                  </Col>
                  <Col md="9" xs="12">
                    <Input type="select" name="multiple-select" id="multiple-select" multiple={true}  onChange={this.handleChange}>
                      {
                        this.state.students.map((optione,index) => {
                          return <option
                            key={index}
                            value={optione._id}>{optione.Firstname}  {optione.Lastname}
                          </option>;
                        })
                      }
                    </Input>
                  </Col>
                </FormGroup>


                <Button type="submit" size="sm" color="primary" block><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"block><i className="fa fa-ban"></i> Reset</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    )
  }

}

export default AffectSC;












/*

import React, {Component, Fragment } from 'react';
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class  AffectSC extends Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);

     this.onsubmit = this.onsubmit.bind(this);
    this.state = {
      classe: '',
      classes : [],
      students :[],
      value:[],
      alert_msg : ''
    };
  }
  getclasses()
  {
    axios.get('http://localhost:5000/class/Getall')
      .then(res => {
        const Cl = res.data;
        this.setState({classes : Cl
        });
        console.log(this.state.classes)
      })
  }
  getstudents()
  {
    axios.get('http://localhost:5000/class/notaff')
      .then(res => {
        const notaf = res.data;
        this.setState({students : notaf
        });
        console.log(this.state.students)
      })
  }
  componentDidMount() {
    this.getclasses();
    this.getstudents()
  }
  handleChange1 (e) {

    this.setState({
      classe: e.target.value
      }
    );

    console.log(this.state.value);

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

  onsubmit(e){
    e.preventDefault();
    if(this.state.value.length!==0){
      this.state.value.forEach(element => {
        axios.post(`http://localhost:5000/class/affect/${this.state.classe}/${element}`)
          .then(res=> {
            console.log(res);
            this.setState({alert_msg: 'success'})
          })



        })
    }
    this.props.history.push('/Listclasses');
  }




  render(){
    return( <Fragment>
        <Col xs="24" md="12">
          <Card>

            <CardBody>
              <Form onSubmit={this.onsubmit} className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="multiple-select">Select Class</Label>
                  </Col>
                  <Col md="9" xs="12">
                    <RadioGroup  name="customized-radios" onChange={this.handleChange1} >
                      {
                        this.state.classes.map((l,index)=>{
                          return <FormControlLabel
                              key={index}
                         value={l._id}
                              control={<Radio />}
                              label={l.name}
                          />

                        })
                      }
                    </RadioGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="multiple-select">Student Not Affected</Label>
                  </Col>
                  <Col md="9" xs="12">
                    <Input type="select" name="multiple-select" id="multiple-select" multiple={true}  onChange={this.handleChange}>
                      {
                        this.state.students.map((optione,index) => {
                          return <option
                            key={index}
                            value={optione._id}>{optione.Firstname}  {optione.Lastname}
                          </option>;
                        })
                      }
                    </Input>
                  </Col>
                </FormGroup>


                <Button type="submit" size="sm" color="primary" block><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"block><i className="fa fa-ban"></i> Reset</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    )
  }

}

export default AffectSC;


*/

