import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';




class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangelast = this.onChangelast.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.Onchangepassword = this.Onchangepassword.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangecng = this.onChangecng.bind(this);
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.Onsubmit = this.Onsubmit.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this)
    this.onChangeRole1 = this.onChangeRole1.bind(this)
    this.state = {
      username: '',
      email: '',
      password: '',
      phonenumber: '',
      firstname: '',
      lastname: '',
      borndate: '',
      confpwd: '',
      role: '',
      isSignedUp: false
    };
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  Onchangepassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangephone(e) {
    this.setState({
      phonenumber: e.target.value
    });
  }
  onChangefirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangelast(e) {
    this.setState({
      lastname: e.target.value
    });
  }
  onChangecng(e) {
    this.setState({
      confpwd: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      borndate: e.target.value
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value = "Teacher"
    })
  }
  onChangeRole1(e) {
    this.setState({
      role: e.target.value = "Student"
    })
  }
  Onsubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      Firstname: this.state.firstname,
      Lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      username: this.state.username,
      borndate: this.state.borndate,
      role: this.state.role,

    };
    axios.post('http://localhost:5000/users/register', user)
      .then(res => {

        if (res.status === 200) {
          this.setState({ isSignedUp: true })
        }

      });

    console.log(user);
  }
  render() {

    if (this.state.isSignedUp) {
      // redirect to dashbord if signed up
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }



    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.Onsubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="FirstName" autoComplete="Firstname" value={this.state.firstname} onChange={this.onChangefirstname} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="LastName" autoComplete="lastname" value={this.state.lastname} onChange={this.onChangelast} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" value={this.state.username} onChange={this.onChangeUsername} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Phone (+216)" autoComplete="phonenumber" value={this.state.phonenumber} onChange={this.onChangephone} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" value={this.state.email} onChange={this.onChangeEmail} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Col xs="12" md="10">
                        <Input type="date" id="date-input" name="date-input" placeholder="date" value={this.state.borndate}
                          onChange={this.onChangeDate} />
                      </Col>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" value={this.state.password} onChange={this.Onchangepassword} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" value={this.state.confpwd} onChange={this.onChangecng} />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="Teacher" onChange={this.onChangeRole} />
                      <Label className="form-check-label" check htmlFor="inline-radio1">Teacher</Label>

                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="Student" onChange={this.onChangeRole1} />
                      <Label className="form-check-label" check htmlFor="inline-radio2">Student</Label>

                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
