
import React, { Fragment, useEffect } from 'react';

import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../Theme/Spinner';
import PropTypes from 'prop-types'
import PostItem from "./PostItem";
import POSTUI from "./PostUI";
import AddPost from './ForumContainer/AddPost'
import Alert from '../../actions/alerts'
const Forum = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])



  return loading ? <Spinner /> : (
    <Fragment>
      <Alert />
      <h1>Welcome to Qwizard Community </h1>
      <AddPost />
      <div>
        {posts.map(post => (<POSTUI key={post._id} post={post} />))

        }
      </div>
    </Fragment>)
}

Forum.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  post: state.post
})
export default connect(mapStateToProps, { getPosts })(Forum)
