import React, { Fragment, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from '../../actions/profile';
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,

    Col,



} from 'reactstrap';
import Alert from '../../actions/alerts';


const AddEducation = ({ addEducation, history }) => {

    const [formdata, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        description: '',
        current: false

    });
    const [toDateDisabled, toggleDisabled] = useState(false);
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description,
        current


    } = formdata;

    const onchange = e => setFormData({ ...formdata, [e.target.name]: e.target.value })


    const onsubmit = e => {
        e.preventDefault();
        addEducation(formdata, history)
    }


    return (
        <Fragment>
            <Card>

                <CardHeader>
                    <strong>Add</strong> education information
</CardHeader>
                <CardBody>
                    <Form onSubmit={e => onsubmit(e)}>
                        <FormGroup>
                            <Label htmlFor="nf-email">School</Label>
                            <Input name="school" placeholder="Enter School.." autoComplete="School" value={school} onChange={e => onchange(e)} />
                            <FormText className="help-block">Please enter your School</FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="nf-password">degree</Label>
                            <Input name="degree" placeholder="Enter degree.." autoComplete="current-degree" value={degree} onChange={e => onchange(e)} />
                            <FormText className="help-block">Please enter your degree</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="nf-password">fiels of Study</Label>
                            <Input name="fieldofstudy" placeholder="Enter fiels of Study.." autoComplete="current-fielsofStudy" value={fieldofstudy} onChange={e => onchange(e)} />
                            <FormText className="help-block">Please enter your fiels of Study</FormText>
                        </FormGroup>

                        <FormGroup >
                            <Col md="3">
                                <Label htmlFor="date-input">From</Label>
                            </Col>
                            <Col xs="12" md="16">
                                <Input type="date" name="from" placeholder="From" value={from} onChange={e => onchange(e)} />
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Label>Current School</Label>
                            <Col md="9">
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="current" checked={current} value={current}
                                        onChange={e => {
                                            setFormData({ ...formdata, current: !current });
                                            toggleDisabled(!toDateDisabled)
                                        }} /> Yes still studying
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col md="3">
                                <Label htmlFor="date-input">To </Label>
                            </Col>
                            <Col xs="12" md="16">
                                <Input type="date" name="to" placeholder="to" value={to} onChange={e => onchange(e)} disabled={
                                    toDateDisabled ? 'disabled' : ''
                                } />
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col md="3">
                                <Label htmlFor="textarea-input">Description</Label>
                            </Col>
                            <Col xs="12" md="16">
                                <Input type="textarea" name="description" id="textarea-input" rows="9"
                                    placeholder="Content..." value={description} onChange={e => onchange(e)} />
                            </Col>
                        </FormGroup>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            <Link to="/dashboard">
                                <Button size="sm" color="danger"><i className="fa fa-ban"></i> Back to dashboard</Button></Link>
                        </CardFooter>
                    </Form>
                </CardBody>
                <Alert />
            </Card>
        </Fragment>
    )
}
AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}
export default connect(null, { addEducation })(AddEducation)
