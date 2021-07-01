import React from 'react';
import{ connect } from 'react-redux';
import '../styles/container.css';
import '../styles/readPost.css';

const ReadPost = (props) => {
    const [post] = props.posts.filter(post => post.id===props.match.params.id)
    //const [post] = props.post;
    return(
    <div className='container'>
        <div className='postHeader'>
            <h2>{post.title} </h2>
            <p>{post.date}</p>
        </div> 
        <p>{post.content}</p>
    </div>);
};
const mapStateToProps = (state, props) => ({
    posts: state.posts //.filter(post => post.id===props.match.params.id)
});
export default connect(mapStateToProps)(ReadPost);