import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../Theme/Spinner';
import { getAllProfile } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ getAllProfile, profile: { profiles, loading } }) => {
    useEffect(() => {
        getAllProfile();
    }, [getAllProfile])
    return (
        <Fragment>
            {loading ? <Spinner /> : <Fragment>
                <h1>Students</h1>
                <p>Browse and connect with Students</p>
                <div>
                    {profiles.length > 0 ? (
                        profiles.map(profile => (<ProfileItem key={profile._id} profile={profile} />)))
                        : <h4>No profiles Found</h4>
                    }
                </div>



            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getAllProfile })(Profiles)
