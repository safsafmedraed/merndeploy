import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { addLike, removeLike, deletePost, addrate } from '../../actions/post'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReactHtmlParser from 'react-html-parser'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import StarsIcon from '@material-ui/icons/Stars';
import CommentIcon from '@material-ui/icons/Comment';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import GradeIcon from '@material-ui/icons/Grade';
import Divider from '@material-ui/core/Divider';
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1960,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
const PostUI = ({ addLike, removeLike, deletePost, addrate,
    auth, post: { _id, text, title, name, avatar, user, likes, comments, date, views, avg }, showActions, show }) => {
    const [rating, setValue] = useState(1);
    const [hover, setHover] = useState(-1);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onsubmit = () => {


        addrate(_id, { rating })

    }



    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Link to={`/single/${user}`}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <img src={avatar} />
                        </Avatar>

                    </Link>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={<Moment format='YYYY/MM/DD'>{date}</Moment>}
            />
            {/*<CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />*/}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {ReactHtmlParser(text)}
                </Typography>
                {show && <Fragment> <h3 className={classes.root}>
                    <Rating
                        name="hover-feedback"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}

                    />

                    {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                </h3>

                    <IconButton aria-label="view" onClick={e => onsubmit(e)}>
                        <DynamicFeedIcon /> send feedback
                    </IconButton>
                </Fragment>}
            </CardContent>
            {showActions && <Fragment>
                <CardActions disableSpacing>
                    <IconButton aria-label="add like" onClick={e => addLike(_id)}>
                        <ThumbUpAltIcon />{likes.length > 0 && <span>{likes.length}</span>}
                    </IconButton>
                    <IconButton aria-label="view" onClick={e => removeLike(_id)}>
                        <ThumbDownIcon />
                    </IconButton>
                    <IconButton aria-label="add to favorites" >
                        <VisibilityIcon />{views}
                    </IconButton>
                    {!auth.loading && user === auth.user._id && (<IconButton aria-label="delete" onClick={e => deletePost(_id)} >
                        <DeleteOutlinedIcon />
                    </IconButton>)}
                    <IconButton aria-label="average rate" >
                        <GradeIcon />{avg}
                    </IconButton>
                    <IconButton aria-label="average rate" >
                        <Link to={`/Singlepost/${_id}`}>
                            <CommentIcon className="lead" />   {comments.length > 0 && (<span>{comments.length}</span>)}
                        </Link> </IconButton>

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                    >
                        <AssignmentIndIcon />{name}
                    </IconButton>
                </CardActions></Fragment>}
            <Divider variant="inset" component="li" />
        </Card>

    );
}
PostUI.defaultProps = {
    showActions: true,
    show: false
}

PostUI.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    addrate: PropTypes.func.isRequired,
}



const mapStateToProps = state => ({
    auth: state.auth

})
export default connect(mapStateToProps, { addLike, removeLike, deletePost, addrate })(PostUI)
