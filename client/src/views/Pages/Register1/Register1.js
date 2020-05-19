import React, { useState, Fragment } from "react";
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap';
import { register } from '../../../actions/auth';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Alert from '../../../actions/alerts';
import Widget04 from '../../Widgets/Widget04';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Register1 = ({ setAlert, register, isAuthenticated }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        Firstname: '',
        Lastname: '',
        borndate: '',
        role: '',
        bornplace: '',
        phonenumber: ''
    });

    const { username,
        email,
        password,
        password2,
        Firstname,
        Lastname,
        borndate,
        role,
        bornplace,
        phonenumber } = formData;

    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('check your Registration form', 'warning');
        }
        else {
            register({
                username,
                email,
                password,
                Firstname,
                Lastname,
                borndate,
                role,
                bornplace,
                phonenumber
            });
        }
    }



    //redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return <Fragment>

        <div className="app flex-row align-items-center">

            <Container>

                <Row className="justify-content-center">

                    <Col md="9" lg="7" xl="6">

                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form onSubmit={e => onSubmit(e)}>
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="FirstName" autoComplete="Firstname" name="Firstname" value={Firstname} onChange={e => onchange(e)} />

                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="LastName" autoComplete="lastname" name="Lastname" value={Lastname} onChange={e => onchange(e)} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Username" autoComplete="username" name="username" value={username} onChange={e => onchange(e)} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Phone (+216)" autoComplete="phonenumber" name="phonenumber" value={phonenumber} onChange={e => onchange(e)} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Email" autoComplete="email" name="email" value={email} onChange={e => onchange(e)} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Col xs="12" md="10">
                                            <Input type="date" id="date-input" name="borndate" placeholder="Born Date" value={borndate}
                                                onChange={e => onchange(e)} />
                                        </Col>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="Text" placeholder="Born Place" autoComplete="Born Place" name="bornplace" value={bornplace} onChange={e => onchange(e)} />
                                    </InputGroup>


                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Password" autoComplete="new-password" name="password" value={password} onChange={e => onchange(e)} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Re-Password" autoComplete="new-password" name="password2" value={password2} onChange={e => onchange(e)} />
                                    </InputGroup>

                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input className="form-check-input" type="radio" id="inline-radio1" name="role" value="Teacher" onChange={e => onchange(e)} />
                                        <Label className="form-check-label" check htmlFor="inline-radio1">Teacher</Label>

                                    </InputGroup>

                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input className="form-check-input" type="radio" id="inline-radio2" name="role" value="Student" onChange={e => onchange(e)} />
                                        <Label className="form-check-label" check htmlFor="inline-radio2">Student</Label>

                                    </InputGroup>
                                    <Button color="success" block>Create Account</Button>
                                </Form>
                            </CardBody>
                            <Widget04 value="0" icon="none">
                                <Alert />
                                <CardFooter className="p-4">
                                    <Row>

                                        <Col xs="12" sm="6">
                                            <Link to="/login">
                                                <Button className="btn-facebook mb-1" block><span>Login</span></Button>
                                            </Link>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-google-plus btn-brand " block onClick={handleClickOpen}><i className="fa fa-google-plus"></i><span>Google+</span></Button>
                                        </Col>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Use Google's Authentification service? Student only"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Let google register you in this platform , by default your mail address will be your password then you can change it anytime
                                           </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">
                                                    Disagree
                                                   </Button>
                                                <a href="http://localhost:5000/auth/google">
                                                    <Button color="primary" autoFocus>
                                                        Agree
                                                 </Button></a>
                                            </DialogActions>
                                        </Dialog>
                                    </Row>
                                </CardFooter>
                            </Widget04>

                        </Card>
                    </Col>
                </Row>

            </Container>

        </div>

    </Fragment>



}



Register1.propTypes = {
    setAlert: propTypes.func.isRequired,
    register: propTypes.func.isRequired,

    isAuthenticated: propTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register1);
