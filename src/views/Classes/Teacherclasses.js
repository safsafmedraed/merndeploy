import {connect} from "react-redux";
import React, {Fragment, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Table} from "reactstrap";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {  getSC} from '../../actions/classe'
import PropTypes, {} from "prop-types";
import Checkbox from '@material-ui/core/Checkbox';




const Teacherclasses =({getSC ,classe:{ classes,loading, spc },auth:{user}})=>{
  useEffect(() => {
    getSC();

  }, [getSC])

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
                  {user.Classes  && user.Classes.length >0 ?(
                    user.Classes  && user.Classes.map(classe =>{

                      return( <FormControlLabel
                          key={classe.classe}
                          value={classe.classe}
                          control={<Radio />}
                          label={classe.classename}

                          name="classid"
                        />


                      )
                    })): <h4>No classes Found</h4>
                  }

                </RadioGroup>
              </Col>
            </FormGroup>
          <CardHeader>
            <i className="fa fa-align-justify"></i>
          </CardHeader>
          <CardBody>

             <Table responsive striped >
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

                               <tr key={detail.user}>
                              <th>{detail.name}</th>
                              <th>{detail.lastname}</th>
                              <th>{detail.email}</th>
                              <th>{detail.phonenumber}</th>
                              <th>

                                <FormControlLabel
                                  control={<Checkbox  name="gilad"  />}
                                  label="Gilad Gray"
                                  key={detail.user}
                                  value={detail.user}
                                />

                                </th>

                            </tr>
                )})

                }




                </tbody>
              </Table>




          </CardBody>
          </Form>

        </Card>
      </Col>
    </Fragment>
  )
}

Teacherclasses.propTypes = {
  getSC: PropTypes.func.isRequired,
  classe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

}
const  mapStateToProps = state => ({
  classe: state.classe,
  auth:state.auth
})

export default connect(mapStateToProps, {getSC })(Teacherclasses);
