import React, { useState, Fragment } from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import propTypes from 'prop-types';
import { login } from '../../../actions/auth';



const Login = ({ login, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }


  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <div className="app flex-row align-items-center">
        <Container>

          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={e => onSubmit(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="email" autoComplete="email" name="email" value={email} onChange={e => onchange(e)} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" value={password} onChange={e => onchange(e)} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <NavLink to="/ForgotPassword" color="link" className="px-0">Forgot password?</NavLink>
                        </Col>

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p className="text-white">Qwizard !</p>
                      <Link to="/register1">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>)
}
Login.propTypes = {
  login: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, login })(Login);
