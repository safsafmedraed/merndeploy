import React from 'react';
import {connect} from "react-redux";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table
} from "reactstrap";
import { getallclasses } from '../../actions/classes';
import PropTypes from "prop-types";


const Affiche = ({ getallclasses }) => {
  const classes =  getallclasses.map(cl=>(
    <tr key={cl._id}>
      <td>{cl.Users.Firstname}</td>
      <td>2012/01/01</td>
      <td>Member</td>
      <td>
        <Badge color="success">Active</Badge>
      </td>
    </tr>

    )
  )




    return (
      <Col xs="12" lg="6">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Classes
          </CardHeader>
          <CardBody>
            {classes.name}
            <Table responsive striped>
              <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
              </thead>
              <tbody>


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
    )


}
Affiche.propTypes = {
  getallclasses: PropTypes.func.isRequired,

};
export default connect(null, { getallclasses })(Affiche)
