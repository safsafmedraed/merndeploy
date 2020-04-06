import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import Alert from '../../actions/alerts';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Table, Button } from 'reactstrap';
import { deleteEducation } from '../../actions/profile';
const Education = ({ education, deleteEducation }) => {


    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td><Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '} {
                edu.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
            }

            </td>
            <td>{edu.description}</td>
            <td><Button size="sm" color="primary" onClick={() => deleteEducation(edu._id)}><i className="fa fa-dot-circle-o"></i> Delete</Button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h1><i className="icon-book-open"></i>{' '}Education Credentials</h1>
            <Alert />
            <Col xs="12" lg="15">
                <Card>
                    <CardHeader>
                        <i ></i> Information
              </CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr>
                                    <th>School</th>
                                    <th>Degree</th>
                                    <th>Field of Study</th>
                                    <th>From/To</th>
                                    <th>Description</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {educations}
                            </tbody>
                        </Table>
                        <Pagination>
                            <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                            <PaginationItem active>
                                <PaginationLink tag="button">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                        </Pagination>
                    </CardBody>
                </Card>
            </Col>

        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education)
