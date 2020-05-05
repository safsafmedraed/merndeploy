import {connect} from "react-redux";
import React, {Fragment, useEffect,useState} from "react";
import Alert from "../../actions/alerts";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input,Table, Label} from "reactstrap";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Spinner from "../Theme/Spinner";
import { GETALLCLASSES ,affectteacher,getteachers,getTC} from '../../actions/classe'
import PropTypes from "prop-types";



const   AffectTC =({ getTC,GETALLCLASSES ,affectteacher,getteachers, classe:{ classes,loading,teachers,TC } }) => {

  useEffect(() => {
    GETALLCLASSES();
    getteachers();
    getTC();
  }, [GETALLCLASSES,getteachers,getTC()])
  const [formData, setFormData] = useState({
    classid: '',
    teacherid:''
  })
  const  {classid,teacherid}  = formData;
  const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });




  const onsubmit=e =>{
    e.preventDefault();
    console.log(classid+ "techedir "+teacherid)

    affectteacher({classid,teacherid})

  }

  const onsubmit1=e =>{
    e.preventDefault();
console.log(teacherid)
    getTC(teacherid)

  }





  return <Fragment>          {loading ? <Spinner /> : <Fragment>

    <Alert/>


    <Col xs="24" md="12">
      <Card>

        <CardBody>
          <Form  className="form-horizontal" onSubmit={e=>onsubmit(e)}>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="multiple-select">Teachers :</Label>
              </Col>
              <Col md="9" xs="12">
                <RadioGroup  name="customized-radios" onClick={ onsubmit1 }   onChange={e=>onchange(e)} >

                  { teachers.map(t =>{
                      return( <FormControlLabel
                          key={t._id}
                          value={t._id}
                          control={<Radio />}
                          label={t.username}
                          name="teacherid"
                        />
                      )
                    })
                  }
                </RadioGroup>
              </Col>

            </FormGroup>





            <CardHeader>
              <i className="fa fa-align-justify"></i> List Of Classes for this Teacher
            </CardHeader>
            <CardBody>

               <Table responsive striped >
                <thead>
                <tr>
                  <th>Class Name</th>

                </tr>
                </thead>
                <tbody>
                {TC.length >0 ?(
                TC  && TC.map(detail=>{

                            return (

                               <tr key={detail._id}>
                              <th>{detail.classename}</th>


                            </tr>
                )})): <h4>No classes Found</h4>

                }

                </tbody>
              </Table>



            </CardBody>






            <FormGroup row>
              <Col md="3">
                <Label htmlFor="multiple-select">Select Class(es) :</Label>
              </Col>


              <Col md="9" xs="12">
                <Input type="select" name="multiple-select" id="multiple-select" multiple={true}  name="classid"  onChange={e=>onchange(e)} >
                      {classes.length>0?(
                    classes.map(optione =>{
                      return (<option
                          key={optione._id}
                          value={optione._id}>{optione.name}
                        </option>
                      )}
                    )): <h4>No Students Found</h4>
                  }
                </Input>
              </Col>
            </FormGroup>



            <Button type="submit" size="sm" color="primary" block><i className="fa fa-dot-circle-o"></i> Affect</Button>
            <Button type="reset" size="sm" color="danger"block><i className="fa fa-ban"></i> Cancel</Button>
          </Form>
        </CardBody>
      </Card>
    </Col>





  </Fragment>}
  </Fragment>

}
AffectTC.propTypes = {
  GETALLCLASSES: PropTypes.func.isRequired,
  affectteacher: PropTypes.func.isRequired,
  getteachers: PropTypes.func.isRequired,
  getTC: PropTypes.func.isRequired,
  classe: PropTypes.object.isRequired,


}
const mapStateToProps = state => ({
  classe: state.classe,

})

export default connect(mapStateToProps ,{GETALLCLASSES,affectteacher,getteachers,getTC})(AffectTC);
