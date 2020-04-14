import React, { useState} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import { addclass } from '../../actions/classes';
import {connect} from "react-redux";
import propTypes from "prop-types";
import {Link} from "react-router-dom";

const Ajout = ({ addclass }) => {

  const [formData, setFormData] = useState({
    name:'',
    section:''
  });
  const {
    name,
    section
  } = formData;
  const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

      addclass({
        name,
       section
      });
    }



    return (
      <Col xs="24" md="12">
        <Card>

          <CardBody>
            <Form onSubmit={e => onSubmit(e)} className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="hf-email"> Class Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="" name="name" placeholder="Entrer Name of class..." autoComplete="name" value={name} onChange={e => onchange(e)} />
                  <FormText className="help-block">Svp Entrez le nom du classe</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="hf-password">Section</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="" name="section" placeholder="Entrer Section..." autoComplete="section" value={section} onChange={e => onchange(e)} />
                  <FormText className="help-block">Svp Entrez le nom du classe</FormText>
                </Col>
              </FormGroup>


                <Button  size="sm" color="primary" block><i className="fa fa-dot-circle-o"></i> Submit</Button>
            <Button type="reset" size="sm" color="danger"block><i className="fa fa-ban"></i> Reset</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    )

}
Ajout.propTypes = {
  addclass: propTypes.func.isRequired,
}


export default connect(null, { addclass })(Ajout)
