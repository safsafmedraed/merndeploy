import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
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

} from 'reactstrap';
import { createProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';
import Alert from '../../actions/alerts';


const CreateProfile = ({ createProfile, history }) => {
    const [formdata, setFormData] = useState({
        location: '',
        status: '',
        institution: ''

    });
    const {
        location,
        status,
        institution,

    } = formdata;


    const onchange = e => setFormData({ ...formdata, [e.target.name]: e.target.value })

    const onsubmit = e => {
        e.preventDefault();
        createProfile(formdata, history);
    }
    return (

        <Card>

            <CardHeader>
                <strong>Add</strong> information to your profile
        </CardHeader>
            <CardBody>
                <Form onSubmit={e => onsubmit(e)}>
                    <FormGroup>
                        <Label htmlFor="nf-email">Location</Label>
                        <Input name="location" placeholder="Enter location.." autoComplete="location" value={location} onChange={e => onchange(e)} />
                        <FormText className="help-block">Please enter your location</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="nf-password">Status   :</Label>
                        <br />
                        <select value={status} onChange={e => onchange(e)} name="status">
                            <option value="0">Current position</option>
                            <option value="Instutor or Teacher">Instutor or Teacher</option>
                            <option value="Student">Student</option>
                            <option value="Internship">Internship</option>

                            <option value="Other">Other</option>

                        </select>

                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="nf-password">Institution</Label>
                        <Input name="institution" placeholder="Enter institution.." autoComplete="current-institution" value={institution} onChange={e => onchange(e)} />
                        <FormText className="help-block">Please enter your Institution</FormText>
                    </FormGroup>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </CardFooter>
                </Form>
            </CardBody>
            <Alert />
        </Card>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(withRouter(CreateProfile));
