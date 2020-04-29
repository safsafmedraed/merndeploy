import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { Card, CardBody, CardHeader, Col, Jumbotron, Button, Form } from 'reactstrap';
import { addLike, removeLike, deletePost, addrate } from '../../actions/post'
import Avatar from '@material-ui/core/Avatar';
import ReactHtmlParser from 'react-html-parser'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});
const PostItem = ({ addLike, removeLike, deletePost, addrate,
    auth, post: { _id, text, title, name, avatar, user, likes, comments, date, views, avg }, showActions, show }) => {

    const [rating, setValue] = useState(1);
    const [hover, setHover] = useState(-1);
    const classes = useStyles();

    const onsubmit = () => {


        addrate(_id, { rating })

    }


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

                            <Link to={`/single/${user}`}>
                                <div className={classes.root}>
                                    <Avatar src={avatar} className={classes.large} />
                                    <h4 >{name}</h4></div></Link>
                            <hr className="my-2" />
                            <h2>views: {' '}{views} </h2>

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
                                <Button onClick={e => onsubmit(e)}>Send Feedback</Button>
                            </Fragment>}
                            {showActions && <Fragment>
                                <h2>average rating: {' '}{avg} </h2>
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
    showActions: true,
    show: false
}

PostItem.propTypes = {
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
export default connect(mapStateToProps, { addLike, removeLike, deletePost, addrate })(PostItem)
