import React, { useState, useEffect } from 'react'
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
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Alert from '../../actions/alerts';
import { withRouter, Link } from 'react-router-dom';

const EditProfile = ({ profile: { profile, loading }, createProfile, history, getCurrentProfile }) => {
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
    useEffect(() => {
        getCurrentProfile();
        setFormData({
            location: loading || !profile.location ? '' : profile.location,
            //status: loading || !profile.status ? '' : profile.status,
            institution: loading || !profile.institution ? '' : profile.institution,
        })
    }, [loading, getCurrentProfile])

    const onchange = e => setFormData({ ...formdata, [e.target.name]: e.target.value })

    const onsubmit = e => {
        e.preventDefault();
        createProfile(formdata, history, true);
    }
    return (

        <Card>

            <CardHeader>
                <strong>Edit</strong>  your profile
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
                        <Link to="/dashboard">
                            <Button size="sm" color="danger"><i className="fa fa-ban"></i> Back to dashboard</Button></Link>
                    </CardFooter>
                </Form>
            </CardBody>
            <Alert />
        </Card>
    )
}
EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));

