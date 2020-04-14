import React, { Fragment } from 'react'
import {Button, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';

const Classes = () => {
  return (
    <Fragment>

      <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        <Link to='/Addclass'>
          <Button block color="dark" className="btn-pill">Add Class</Button></Link>

      </Col>



      <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        <Link to='/Listclasses'>
          <Button block color="dark" className="btn-pill">List Classes</Button></Link>
      </Col>


      <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        <Link to='/Listclasses'>
          <Button block color="dark" className="btn-pill">Affect Students</Button></Link>
      </Col>


    </Fragment>
  )
}


export default Classes
