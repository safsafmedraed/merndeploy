import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';



const DefaultHeader = ({ auth: { isAuthenticated, loading, user }, logout }) => {

 
  const authLinks = (

    <NavItem className="d-md-down-none">
      <NavLink to="/login" tag="div" className="text-center" onClick={logout}><i className="fa fa-lock"><strong>Logout</strong> </i></NavLink>
    </NavItem>
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
            <NavLink to="/users" tag="div" className="text-center"><h5 className="fa fa-user"><strong>Profile</strong></h5></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><h3><strong>Welcome <i>{user && user.username}</i></strong></h3></NavLink>
          </NavItem>
          {!loading && (<Fragment>{isAuthenticated ? authLinks : GuestLinks}</Fragment>)}


          {/*<UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>

              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem>

                <i className="fa fa-user" ></i> Profile</DropdownItem>


              <DropdownItem divider />

              <DropdownItem><i className="fa fa-lock" ></i> Logout</DropdownItem>
            </DropdownMenu>
  </UncontrolledDropdown>*/}
        </Nav>

        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    </Fragment>
  );
}



DefaultHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(DefaultHeader);
