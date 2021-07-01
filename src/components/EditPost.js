import React, {useState} from 'react';
import PostForm from './PostForm';
import {startEditPost, startRemovePost} from '../store/actions/posts';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/container.css';
import '../styles/editPost.css';
import Modal from '../components/Modal';


const EditPost = (props)=>{
    const [modal, setmodal] = useState(false);
const removePostHandler = () =>{
    setmodal(true);
};
const closeModalHandler = () =>{
    setmodal(false);
}
const modelNoClickHandler = ()=>{
    setmodal(false);
}
const modelYesClickHandler = ()=>{
    setmodal(false);
    props.onRemovePost(props.match.params.id);
    props.history.push('/dashboard');
}
    return(
        <React.Fragment>
        <Modal active={modal} closeModal = {closeModalHandler}>
        <p>Do you really Want to delete the post?</p>
        
        <button className='modalNo' onClick = {modelNoClickHandler}>No</button>
        <button className='modalYes' onClick = {modelYesClickHandler}>Yes</button>        
        </Modal>
        <div className="container">
            <div className='Liink'>
            <Link    
            to ={`/read/${props.match.params.id}`}
            >
            {`http://localhost:3000/read/${props.match.params.id}`}
            </Link>
            </div>
        </div>
            <PostForm post={props.post} onSubmitt = {(updates) => {
                
                props.onEditPost(props.match.params.id, updates);
                props.history.push('/');
            }}/>
        <div className='container'>
            <button className='removeButton' onClick = {removePostHandler}>Remove Post</button>
        </div>
        </React.Fragment>
    );
};
const mapDispatchToProps = dispatch => ({
    onEditPost: (id, updates) => dispatch(startEditPost(id, updates)),
    onRemovePost: (id) => dispatch(startRemovePost(id))
});
const mapStateToProps = (state, props) =>({
    post: state.posts.filter((post) => post.id === props.match.params.id,
    
    )
});
export default connect(mapStateToProps, mapDispatchToProps)(EditPost);