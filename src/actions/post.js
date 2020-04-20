import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT, RATE } from './types';

//get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/post/')
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
        const res = await axios.put(`http://localhost:5000/post/like/${id}`)
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
        const res = await axios.put(`http://localhost:5000/post/unlike/${id}`)
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
    try {
        await axios.delete(`http://localhost:5000/post/${id}`)
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
//Add post 
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('http://localhost:5000/post/', formData, config)
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
        const res = await axios.get(`http://localhost:5000/post/${id}`)
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
        const res = await axios.post(`http://localhost:5000/post/comment/${postId}`, formData, config)
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

    try {
        await axios.delete(`http://localhost:5000/post/comment/${postId}/${commentId}`)
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
//Rate
export const addrate = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`http://localhost:5000/post/rate/${postId}`, formData, config)
        dispatch({
            type: RATE,
            payload: res.data
        })

        dispatch(setAlert('Rate success', 'warning'))
    } catch (error) {
        dispatch(setAlert('Rating Failed or you already rated this post', 'warning'))
    }

}