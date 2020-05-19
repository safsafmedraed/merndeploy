import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'
import { Button } from 'reactstrap';
const CommentItem = ({ postId,
    comment: { _id, text, name, avatar, user, date }, auth, deleteComment }) =>
    (
        <Fragment>
            <List >

                <ListItem alignItems="flex-start">
                    <Link to={`/single/${user}`}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={avatar} />
                        </ListItemAvatar></Link>
                    <ListItemText
                        primary={text}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"

                                    color="textPrimary"
                                >
                                    {name} {' '}
                                </Typography>
                               Posted on  <Moment format="YYYY/MM/DD HH:mm:ss">{date}</Moment> {' '}{!auth.loading && user === auth.user._id && (
                                    <Button onClick={e => deleteComment(postId, _id)}> <i className="cui-trash icons "></i></Button>
                                )}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />

            </List>
        </Fragment>
    )


CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { deleteComment })(CommentItem)
