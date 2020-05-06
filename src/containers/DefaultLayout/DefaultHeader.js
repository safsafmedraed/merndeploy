import React, { Fragment, useState, useEffect, Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
const DefaultHeader = ({ auth: { isAuthenticated, loading, user }, logout }) => {

  useEffect(() => {
    getuser();
  }, [])
  const [user1, setuser1] = useState('');
  const getuser = () => {
    const id = localStorage.getItem('user1');

    axios.get(`http://localhost:5000/users/userid/${id}`)
      .then(res => {
        setuser1(res.data.avatar)
      })

  }


  const authLinks = (
    <UncontrolledDropdown nav direction="down">
      <DropdownToggle nav>
        <Avatar src={user1} />
      </DropdownToggle>
      <DropdownMenu right>

        <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
        <Link to="/editavatar"  >
          <DropdownItem><i className="fa fa-lock" ></i> Edit Profile picture</DropdownItem></Link>
        <Link to='/users'>
          <DropdownItem>

            <i className="fa fa-user" ></i> Profile</DropdownItem>


          <DropdownItem divider />
        </Link>

        <Link to="/login" onClick={logout} >
          <DropdownItem><i className="fa fa-lock" ></i> Logout</DropdownItem></Link>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
  const GuestLinks = (
    null
  );

  // eslint-disable-next-line


  return (
    <Fragment>
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>

          </NavItem>

        </Nav>

        <Nav className="ml-auto" navbar>

          <NavItem className="d-md-down-none">

            <NavLink to="#" className="nav-link"><h3><strong>Welcome <i>{user.username} </i></strong></h3></NavLink>
          </NavItem>
          {!loading && (<Fragment>{isAuthenticated ? authLinks : GuestLinks}</Fragment>)}



        </Nav>

        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    </Fragment>
  );
}



DefaultHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(DefaultHeader);
