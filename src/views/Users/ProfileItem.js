import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
const ProfileItem = ({ profile: {
    user: { _id, username, avatar, role },
    status,
    location,
    institution
} }) => {
    return (
        <Fragment>


            <img src={avatar} className="img-avatar" alt="avatar" />
            <div><h2>{username}</h2>
                <p>{status} {institution && <span>at {institution}</span>}</p>
                <p>{location && <span>Location :{location}</span>}</p>
                <Link to={`/Single/${_id}`} >
                    <Button block color="dark" className="btn-pill">View Profile</Button>
                </Link>

            </div>





        </Fragment>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
