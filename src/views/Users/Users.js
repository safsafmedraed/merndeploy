import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, CardGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../Theme/Spinner';
import Widget04 from '../Widgets/Widget04';
import HasProfile from "../../actions/HasProfile";
import Education from "./Education"

const Users = ({ getCurrentProfile,
  deleteAccount,
  auth: { user },
                 profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile])

  return loading && profile === null ? <Spinner /> : <Fragment>

    <CardGroup className="mb-4">
      <Col sm="15" md="5">
        <Widget04 icon="icon-people" color="danger" header="Welcome" value="25">{user && user.username}</Widget04>
      </Col>

    </CardGroup>
    {profile !== null ? <Fragment><HasProfile />
      <Education education={profile.education} />
      <div>
        <Button block color="danger" className="btn-pill" onClick={() => deleteAccount()}>Delete My Account</Button>
      </div>
    </Fragment> : <Fragment><h2>You have not set up a profile yet, please add some info </h2>
        <Link to='/CreateProfile' className="mb-3 mb-xl-0"><Button color="primary">Create Profile</Button></Link>
      </Fragment>}
  </Fragment>;

}
Users.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})




/*function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.registered}</td>
      <td>{user.role}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}*/

/*class Users extends Component {

  render() {

    const userList = usersData.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}*/

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Users);
