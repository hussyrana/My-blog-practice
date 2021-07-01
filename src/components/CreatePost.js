import React from 'react';
import PostForm from './PostForm';
import {connect} from 'react-redux';
import {startAddPost} from '../store/actions/posts';

const CreatePost = (props) => {
    return(
            <PostForm onSubmitt={(post)=>{
                props.onAddPost(post);
                props.history.push('/');
            }}/>
        
    );
};
const mapDispatchToProps = dispatch => ({
    onAddPost: (post) => dispatch(startAddPost(post))
});
export default connect(null, mapDispatchToProps)(CreatePost);