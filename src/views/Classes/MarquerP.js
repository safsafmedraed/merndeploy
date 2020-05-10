import {connect} from "react-redux";
import React, {Fragment, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {getSC, marquerpr} from '../../actions/classe'
import PropTypes, {} from "prop-types";




const MarquerP =({getSC ,    marquerpr   ,     classe:{  spc },     auth:{user}}      )=>{
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

  const onsubmit1=async e =>{
    e.preventDefault();
    selected.forEach(e=>{
        console.log("aaa"+e)
        marquerpr(formData,e )

      }

    )
  }



  return(
    <Fragment>

      <Col xs="20" lg="30">
        <Card>

          <Form  className="form-horizontal" onSubmit={e=>onsubmit1(e)} >
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

              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="multiple-select">Students</Label>
                </Col>
                <Col md="9" xs="12">
                  <Input type="select" id="multiple-select" multiple={true}  name="studentid"  onChange={e=>onChange(e)} >
                    { spc.Users  && spc.Users.map(optione =>{
                      return (<option
                          key={optione.user}
                          value={optione.user}>{optione.name}     {optione.lastname}
                        </option>
                      )}
                    )
                    }
                  </Input>
                </Col>
              </FormGroup>
            </CardBody>

            <Button type="submit" size="sm" color="success"    block><i className="fa fa-ban"></i> Mark</Button>



          </Form>

        </Card>
      </Col>
    </Fragment>
  )
}

MarquerP.propTypes = {
  getSC: PropTypes.func.isRequired,
  marquerpr:PropTypes.func.isRequired,
  classe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

}
const  mapStateToProps = state => ({
  classe: state.classe,
  auth:state.auth
})

export default connect(mapStateToProps, {marquerpr,getSC })(MarquerP);
