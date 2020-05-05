import {connect} from "react-redux";
import React, {Fragment, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Table} from "reactstrap";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { GETALLCLASSES ,deletestudent ,getSC} from '../../actions/classe'
import PropTypes, {} from "prop-types";
import { MDBDataTable } from 'mdbreact';




const Affiche =({getSC,GETALLCLASSES ,deletestudent ,history  ,classe:{ classes,loading, spc }})=>{
  useEffect(() => {
    GETALLCLASSES();getSC();

  }, [GETALLCLASSES,getSC])

  const [formData, setFormData] = useState({
    classid: '',
  })

  const  {classid}  = formData;
  const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });



  const onsubmit=e =>{
    e.preventDefault();
    console.log(classid+"////")
     getSC(classid)


  }
  const data = {
    columns: [
      {
        label: 'FirstName',
        field: 'FirstName',
        sort: 'asc',
        width: 150
      },
      {
        label: 'LastName',
        field: 'LastName',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Email',
        field: 'Email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'PhoneNumber',
        field: 'PhoneNumber',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Action',
        field: 'Action',
        sort: 'asc',
        width: 150
      }

    ],

    rows: spc.Users  && spc.Users.map(detail=>{

      return{
        FirstName:detail.name,
        LastName:detail.lastname,
        Email:detail.email,
        PhoneNumber:detail.phonenumber,
        Action:<Button size="sm" color="danger"   onClick={() =>{if(window.confirm('Are you sure you want to delete this Student?')) deletestudent(detail.cl,detail._id,history)}}><i className="fa fa-dot-circle-o"></i> Delete</Button>


      }


  })

}


    return(
      <Fragment>

        <Col xs="20" lg="30">
          <Card>

            <Form  className="form-horizontal"  >
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="multiple-select">Select Class</Label>
                </Col>
                <Col md="9" xs="12">
                  <RadioGroup  name="customized-radios" onClick={ onsubmit } onChange={e=>onchange(e)  }   >
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
            </Form>
            <CardHeader>
              <i className="fa fa-align-justify"></i> List Of Students
            </CardHeader>
            <CardBody>

             {/* <Table responsive striped >
                <thead>
                <tr>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>

                {spc.Users  && spc.Users.map(detail=>{

                            return (

                               <tr key={detail._id}>
                              <th>{detail.name}</th>
                              <th>{detail.lastname}</th>
                              <th>{detail.email}</th>
                              <th>{detail.phonenumber}</th>
                              <td><Button size="sm" color="danger"  onClick={() =>{if(window.confirm('Are you sure you want to delete this Student?')) deletestudent(detail.cl,detail._id)}}><i className="fa fa-dot-circle-o"></i> Delete</Button></td>


                            </tr>
                )})

                }




                </tbody>
              </Table>*/}

              <MDBDataTable
                striped
                bordered
                small
                data={data}
              />


            </CardBody>

          </Card>
        </Col>
      </Fragment>
    )
  }

Affiche.propTypes = {
  GETALLCLASSES: PropTypes.func.isRequired,
  getSC: PropTypes.func.isRequired,
  deletestudent:PropTypes.func.isRequired,
  classe: PropTypes.object.isRequired,
}
  const  mapStateToProps = state => ({
    classe: state.classe,

  })

export default connect(mapStateToProps, {getSC,GETALLCLASSES,deletestudent })(Affiche);







































/*

import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {  Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label,  Table} from "reactstrap";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


class  Affiche extends Component{

  constructor(props){
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);

    this.state = {
      classe: '',
      classes : [],
      students :[],
      details:[]

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
  handleChange1 (e) {
    this.setState({
        classe: e.target.value
      }
    )
    this.setState({details : []})
    axios.get(`http://localhost:5000/class/users/${this.state.classe}`)
      .then(res => {
        const notaf = res.data.Users;
        this.setState({students : notaf
        })
        console.log(this.state.students)

        this.state.students.forEach(student=>{
          let x = student._id
            axios.get(`http://localhost:5000/class/userdetails/${x}`)
              .then(res => {
                const k = res.data;
                this.setState({details : [...this.state.details,k]
                })
                console.log(this.state.details)
              })

          }
        )

      })

  }
  componentDidMount() {
    this.getclasses();
  }

  render(){
    return( <Fragment>

      <Col xs="20" lg="30">
        <Card>

          <Form  className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="multiple-select">Select Class</Label>
              </Col>
              <Col md="9" xs="12">
                <RadioGroup  name="customized-radios" onChange={this.handleChange1} >
                  {
                    this.state.classes.map((l,index)=>{
                      return <FormControlLabel
                        key={index+1}
                        value={l._id}
                        control={<Radio />}
                        label={l.name}
                      />
                    })
                  }
                </RadioGroup>
              </Col>
            </FormGroup>
          </Form>
          <CardHeader>
            <i className="fa fa-align-justify"></i> List Of Students
          </CardHeader>
          <CardBody>

            <Table responsive striped>
              <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
              </thead>
              <tbody>
              {this.state.details.map((detail, index)=>{
               return  <tr key={index}>
                   <th>{detail.Firstname}</th>
                 <th>{detail.Lastname}</th>
                 <th>{detail.email}</th>
                 <th>{detail.phonenumber}</th>

                </tr>

                }

              )}

              </tbody>
            </Table>

          </CardBody>
        </Card>
      </Col>
      </Fragment>
    )
  }


}


export default Affiche;

*/
