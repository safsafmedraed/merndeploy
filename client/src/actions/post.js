import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT, RATE } from './types';

//get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/post/')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }

}
//Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/post/like/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }

}
//Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/post/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }

}
//delete post 
export const deletePost = id => async dispatch => {
    if (window.confirm('Are you sure? this can not be undone')) {
        try {
            await axios.delete(`/post/${id}`)
            dispatch({
                type: DELETE_POST,
                payload: id
            })
            dispatch(setAlert('Post Removed', 'warning'))
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }

            });
        }

    }
}
//Add post 
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/post/', formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created', 'warning'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }

}
//get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/post/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }

}
//Add Comment 
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/post/comment/${postId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'warning'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }

        });
    }

}
//delete Comment 
export const deleteComment = (postId, commentId) => async dispatch => {
    if (window.confirm('Are you sure? this can not be undone')) {
        try {
            await axios.delete(`/post/comment/${postId}/${commentId}`)
            dispatch({
                type: REMOVE_COMMENT,
                payload: commentId
            })
            dispatch(setAlert('Comment Removed', 'warning'))
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }

            });
        }

    }
}
//Rate
export const addrate = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/post/rate/${postId}`, formData, config)
        dispatch({
            type: RATE,
            payload: res.data
        })

        dispatch(setAlert('Rate success', 'warning'))
    } catch (error) {
        dispatch(setAlert('Rating Failed or you already rated this post', 'warning'))
    }

}