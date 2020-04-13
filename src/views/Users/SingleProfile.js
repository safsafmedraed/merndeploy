import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../Theme/Spinner';
import { getProfilebyID } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import ProfileAbout from './ProfileAbout'
const SingleProfile = ({ match, getProfilebyID, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfilebyID(match.params.id);
    }, [getProfilebyID, match.params.id])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>


                {auth.isAuthenticated && auth.loading === false
                    && auth.user._id === profile.user._id
                    && (<Link to='/EditProfile'>
                        <Button block color="dark" className="btn-pill">Edit My profile</Button>
                    </Link>)}

                <div>
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                </div>
            </Fragment>}
            <Link to='/Profiles'>
                <Button block color="dark" className="btn-pill">Back To all Profiles</Button>
            </Link>
        </Fragment >
    )
}

SingleProfile.propTypes = {
    getProfilebyID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getProfilebyID })(SingleProfile)
