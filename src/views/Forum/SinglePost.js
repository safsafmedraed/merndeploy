import React, { Fragment, useEffect } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../Theme/Spinner'
import PostItem from '../Forum/PostItem'
import { getPost } from '../../actions/post'
import { Button } from 'reactstrap';
import Addcomment from '../Forum/Addcomment'
import Alert from "../../actions/alerts"
import CommentItem from '../Forum/CommentItem'
const SinglePost = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])
    return loading || post === null ? <Spinner /> : <Fragment>

        <Link to='/Forum' >
            <Button>
                back to all posts
            </Button>

        </Link>
        <PostItem post={post} showActions={false} />
        <Alert />
        <Addcomment postId={post._id} />
        <div>
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>

    </Fragment>
}

SinglePost.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost })(SinglePost)
