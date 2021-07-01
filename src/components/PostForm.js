import React from 'react';
import moment from 'moment';
import '../styles/createPost.css';
import '../styles/container.css';

class PostForm extends React.Component{
    state = {
        title:'',
        content:'',
        error:null 
    }
    componentDidMount(){
        if(this.props.post){
            const [post] = this.props.post;
            this.setState(()=>({
                title:post.title,
                content:post.content
            }));    
        }                                             
    }
    titleChangeHandler = (e) => {
        const val = e.target.value;
        this.setState(()=>({title: val, error:null}));
    }
    contentChangeHandler = (e) => {
        const val = e.target.value;
        this.setState(()=>({content: val, error:null}));
    }
    formSubmit = (e) => {
        e.preventDefault();
        if(this.state.title && this.state.content){
            this.props.onSubmitt({
            title: this.state.title,
            content: this.state.content,
            date: moment().format("MMM Do YYYY")
            });
        }else{
            this.setState({error: 'Please enter the title and content.'})
        }
    }
    render(){
    return(
            <form className='container' onSubmit = {this.formSubmit}>
             <p style = {{color:'red', fontStyle:'italic'}}>{this.state.error}</p>
            <div className='postForm'>
            <input 
            type='text' 
            placeholder='Enter post title' 
            onChange={this.titleChangeHandler}
            value = {this.state.title}
            autoFocus
            ></input>
            <textarea 
            placeholder='Enter post content'
            onChange = {this.contentChangeHandler}
            value = {this.state.content}
            ></textarea>
            </div>
            <button className='saveButton' type='submit'>Save Post</button>
            </form>
    );
    };
};
export default PostForm;