import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, Col, Jumbotron } from 'reactstrap';
import Moment from 'react-moment'
const ProfileAbout = ({ profile: { user: { Firstname, Lastname, email, phonenumber, borndate } } }) => {
    return (
        <Fragment>
            <Col>
                <Card>

                    <CardBody>
                        <Jumbotron>

                            <h1 className="display-3">Extra information </h1>
                            <p className="lead"><em>First name  :{Firstname}</em></p>
                            <p className="lead"><em>Last name :{Lastname}</em></p>
                            <hr className="my-2" />
                            <p className="lead"><em>Email :{email}</em></p>
                            <p className="lead"><em>Phone Number  :{phonenumber}</em></p>
                            <hr className="my-2" />
                            <p className="lead"><em>borndate  :<Moment format='YYYY/MM/DD'>{borndate}</Moment></em></p>
                        </Jumbotron>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
