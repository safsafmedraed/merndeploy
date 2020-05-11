import React, {Fragment, useState} from 'react';
import {Button, Card, CardBody, Col, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addclass } from '../../actions/classe.js'
import Alert from '../../actions/alerts'


const   Ajout  =({addclass ,history}) => {

  const [formData, setFormData] =
    useState({
      name: '',
      section: '',

    });
  const {
    name,
    section
  } = formData;

  const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});
  const onsubmit =async e => {
    e.preventDefault();
    addclass(formData,history)
  }


  return <Fragment>
    <Alert/>
      <Col xs="24" md="12">
        <Card>
          <CardBody>
            <Form onSubmit={e => onsubmit(e)} className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name"> Class Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="name" name="name" placeholder="..." autoComplete="name"
                         value={name} onChange={e => onchange(e)}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="section">Section</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="section" name="section" placeholder="..." autoComplete="section"
                         value={section} onChange={e => onchange(e)} />
                </Col>
              </FormGroup>


              <Button type="submit" size="sm" color="primary" block><i
                className="fa fa-dot-circle-o"></i> ADD</Button>
              <Button type="reset" size="sm" color="danger" block><i className="fa fa-ban"></i> CANCEL</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Fragment>


}

Ajout.propTypes = {
    addclass: PropTypes.func.isRequired,
  }

export default connect(null, { addclass })(Ajout);
