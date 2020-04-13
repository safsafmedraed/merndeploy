import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { Card, CardBody, CardHeader, Col, Jumbotron, Button } from 'reactstrap';
import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem = ({ addLike, removeLike, deletePost,
    auth, post: { _id, text, name, avatar, user, likes, comments, date } }) =>

    (

        <Fragment>

            <Col>
                <Card>
                    <CardHeader>
                        <i className="fa fa-user"></i>

                    </CardHeader>
                    <CardBody>
                        <Jumbotron>
                            <Link to={`/single/${user}`}>
                                <img src={avatar} className="round-img" alt="userface" />
                                <h1 className="display-3">{name}</h1></Link>
                            <h3 className="lead"><em>description :</em> {' '}{text}</h3>
                            <hr className="my-2" />
                            <Button className="lead" onClick={e => addLike(_id)}><i className="cui-thumb-up icons ">like {likes.length > 0 && <span>{likes.length}</span>}</i></Button>
                            <Button className="lead" onClick={e => removeLike(_id)}><i className="cui-thumb-down icons ">unlike</i></Button>
                            <p className="lead"><i className="cui-calendar icons font-2xl d-block mt-4"><em>Posted on  {' '}<Moment format='YYYY/MM/DD'>{date}</Moment>:</em></i></p>
                            <Link to={`/post/${_id}`}>
                                <Button className="lead"><span>Discussion {comments.length > 0 && (<span>{comments.length}</span>)}</span></Button></Link>
                            {!auth.loading && user === auth.user._id && (<Button className="lead" onClick={e => deletePost(_id)} ><i className="cui-delete icons "><em >Delete</em></i></Button>)}

                        </Jumbotron>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>

    )


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
