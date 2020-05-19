import React, { Fragment, useState } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { sendpass } from '../../../actions/forgotpassword';
import propTypes from 'prop-types';
import { connect } from 'react-redux';



const ForgotPassword = ({ sendpass }) => {

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;
    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();

        sendpass(email)
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
                                            <h1>ForgotPassword</h1>
                                            <p className="text-muted">Enter your Mail Please !</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="email" autoComplete="email" name="email" value={email} onChange={e => onchange(e)} />
                                            </InputGroup>

                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" >Reset</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <NavLink to="/login" color="link" className="px-0">Return to login</NavLink>
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

        </Fragment>

    )

}

ForgotPassword.propTypes = {
    sendpass: propTypes.func.isRequired,
}
const mapStateToProps = state => ({
    sendpass: state.auth.sendpass
})
export default connect(mapStateToProps, { sendpass })(ForgotPassword); 