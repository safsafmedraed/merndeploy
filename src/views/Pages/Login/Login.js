import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert, Fade } from 'reactstrap';
import axios from 'axios';

class Login extends Component {
  constructor(props) {

    super(props);
    this.Onchangepwd = this.Onchangepwd.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.Onsubmit = this.Onsubmit.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      email: '',
      password: '',
      isSignedUp: false,
      hide: true,
      fadeIn: true,
    };
  }
  onChangeUsername(e) {
    this.setState({
      email: e.target.value
    });
  }
  Onchangepwd(e) {
    this.setState({
      password: e.target.value
    })
  }
  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }
  Onsubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post('http://localhost:5000/users/login', user)
      .then(res => {
        if (res.status === 200) {
          this.setState({ isSignedUp: true })
        }
      }).catch(this.setState({ hide: false }));;





  }
  render() {


    if (this.state.isSignedUp) {
      // redirect to Forum if signed up
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }
    return (

      <div className="app flex-row align-items-center">
        <Container>

          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.Onsubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="email" autoComplete="email" value={this.state.email} onChange={this.onChangeUsername} required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" value={this.state.password} onChange={this.Onchangepwd} required minLength="8" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                        <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                          <CardBody hidden={this.state.hide}>
                            <Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>
                            <Alert color="warning">
                              Please Check your email or Password !
                             </Alert>
                          </CardBody></Fade>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p className="text-white">Qwizard !</p>
                      <Link to="/register">
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
    );
  }
}

export default Login;
