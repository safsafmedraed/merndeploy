import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { Card, CardBody, CardHeader, Col, Jumbotron, Button } from 'reactstrap';
import { addLike, removeLike, deletePost } from '../../actions/post'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser'
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));
const PostItem = ({ addLike, removeLike, deletePost,
    auth, post: { _id, text, title, name, avatar, user, likes, comments, date, views }, showActions }) => {
    const classes = useStyles();
    return (

        <Fragment>

            <Col>
                <Card>
                    <CardHeader>
                        <i className="fa fa-user"></i>

                    </CardHeader>
                    <CardBody>
                        <Jumbotron>
                            <h1 ><em>Title :</em> {' '}{title}</h1>
                            <h3> <em>description :</em></h3> {' '}{ReactHtmlParser(text)}
                            <p className="lead"><i className="cui-calendar icons font-2xl d-block mt-4"><em>Posted on  {' '}<Moment format='YYYY/MM/DD'>{date}</Moment></em></i></p>
                            <div>

                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Rate</Typography>
                                    <Rating
                                        name="customized-icons"
                                        defaultValue={0}
                                        getLabelText={(value) => customIcons[value].label}
                                        IconContainerComponent={IconContainer}
                                    />
                                </Box>
                            </div>
                            <Link to={`/single/${user}`}>
                                <div className={classes.root}>
                                    <Avatar src={avatar} className={classes.large} />
                                    <h4 >{name}</h4></div></Link>
                            <hr className="my-2" />
                            <h2>views: {' '}{views} </h2>
                            {showActions && <Fragment>
                                <Button className="lead" onClick={e => addLike(_id)}><i className="cui-thumb-up icons ">like {likes.length > 0 && <span>{likes.length}</span>}</i></Button>
                                <Button className="lead" onClick={e => removeLike(_id)}><i className="cui-thumb-down icons ">unlike</i></Button>
                                <hr />
                                <br />
                                <Link to={`/Singlepost/${_id}`}>
                                    <Button className="lead"><span>Discussion {comments.length > 0 && (<span>{comments.length}</span>)}</span></Button></Link>
                                {!auth.loading && user === auth.user._id && (<Button className="lead" onClick={e => deletePost(_id)} ><i className="cui-delete icons "><em >Delete</em></i></Button>)}


                            </Fragment>}


                        </Jumbotron>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>

    )
}
PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
}



const mapStateToProps = state => ({
    auth: state.auth

})
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
