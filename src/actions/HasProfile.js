import React, { Fragment } from 'react'
import { Button, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const HasProfile = () => {
    return (
        <Fragment>
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Link to='/EditProfile'>
                    <Button block color="dark" className="btn-pill">Edit profile</Button></Link>
            </Col>
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Link to='/AddEducation'>
                    <Button block color="dark" className="btn-pill">Add Education</Button></Link>
            </Col>
        </Fragment>
    )
}


export default HasProfile
