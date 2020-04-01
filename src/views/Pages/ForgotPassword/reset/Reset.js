import React, { Fragment, useState } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { resetpass } from '../../../../actions/forgotpassword';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../../../actions/alert';
import { useParams } from "react-router-dom";



const Reset = ({ resetpass }) => {

    const [formData, setFormData] = useState({
        password: '',
        password1: ''
    });


    let { token } = useParams();

    const { password, password1 } = formData;

    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password1) {
            setAlert('Password does not match', 'warning')

        }

        resetpass(password, token);
        const query = new URLSearchParams();
        console.log(token);

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
                                            <h1>Reset Password </h1>
                                            <p className="text-muted">Enter your new Password Please !</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="password" autoComplete="password" name="password" value={password} onChange={e => onchange(e)} />
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Re-tape password" autoComplete="password" name="password1" value={password1} onChange={e => onchange(e)} />
                                            </InputGroup>

                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" >Validate</Button>
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

Reset.propTypes = {
    resetpass: propTypes.func.isRequired,
}
const mapStateToProps = state => ({
    resetpass: state.auth.resetpass
})
export default connect(mapStateToProps, { resetpass })(Reset); 