import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { editaccount, getCurrentAccount } from '../../actions/profile';
import Alert from '../../actions/alerts';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap';
import Widget04 from '../Widgets/Widget04';
const EditAccount = ({ auth: { user, loading }, editaccount, history, getCurrentAccount }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        // password: '',
        // password2: '',
        Firstname: '',
        Lastname: '',
        borndate: '',

        bornplace: '',
        phonenumber: ''
    });

    const { username,
        email,
        //  password,
        // password2,
        Firstname,
        Lastname,
        borndate,

        bornplace,
        phonenumber } = formData;
    useEffect(() => {
        getCurrentAccount();
        setFormData({
            username: loading || !user.username ? '' : user.username,
            email: loading || !user.email ? '' : user.email,
            password: loading || !user.password ? '' : user.password,
            Firstname: loading || !user.Firstname ? '' : user.Firstname,
            Lastname: loading || !user.Lastname ? '' : user.Lastname,
            bornplace: loading || !user.bornplace ? '' : user.bornplace,
            phonenumber: loading || !user.phonenumber ? '' : user.phonenumber,
        })
    }, [loading, getCurrentAccount])

    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        editaccount(formData, history, true);
    }





    return (
        <Fragment>

            <div className="app flex-row align-items-center">

                <Container>

                    <Row className="justify-content-center">

                        <Col md="9" lg="7" xl="6">

                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={e => onSubmit(e)}>
                                        <h1>Edit Account</h1>

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



                                        <Button color="success" block>Edit Account</Button>
                                    </Form>
                                </CardBody>
                                <Widget04 value="0" icon="none">
                                    <Alert /></Widget04>

                            </Card>
                        </Col>
                    </Row>

                </Container>

            </div>

        </Fragment>


    )
}

EditAccount.propTypes = {
    editaccount: PropTypes.func.isRequired,
    getCurrentAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { editaccount, getCurrentAccount })(withRouter(EditAccount))
