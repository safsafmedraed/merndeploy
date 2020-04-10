import React, { Fragment } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Jumbotron } from 'reactstrap';
import PropTypes from 'prop-types'
const ProfileTop = ({ profile: {
    status, institution, location, user: { avatar, username }
} }) => {
    return (
        <Fragment>
            <Col>
                <Card>
                    <CardHeader>
                        <i className="fa fa-user"></i>

                    </CardHeader>
                    <CardBody>
                        <Jumbotron>
                            <img src={avatar} className="round-img" alt="userface" />
                            <h1 className="display-3">{username}</h1>
                            <p className="lead"><em>Status :</em> {' '}{status}{institution && <span> at {institution}</span>}</p>
                            <hr className="my-2" />
                            <p className="lead"><em>Location:</em>{' '} {location}</p>
                        </Jumbotron>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
