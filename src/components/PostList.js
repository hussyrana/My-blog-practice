import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/postList.css';

const PostList = (props) => {
    let preposts = props.posts;
    if(props.filterText!==''){
        if(props.filter==='By Title'){
        preposts = props.posts.filter(post => post.title.toLowerCase().includes(props.filterText.toLowerCase()));
        }else if(props.filter==='By Content'){
            preposts = props.posts.filter(post => post.content.toLowerCase().includes(props.filterText.toLowerCase()));
        }
    }
   const posts = preposts.map(post=>{
        return (
            <Link className='Link' to = {`/edit/${post.id}`} key={post.id}>
                <div className='post'>
                    <h3 className='post_title'>{post.title}</h3>
                    <p className='post_content'>{post.content}</p>
                    <p className='post_date'>{post.date}</p>
                </div>
            </Link>
            );  
    }); 
    return(
        <div>
          {posts}
        </div>
    );
}
const mapStateToProps = state => ({
 posts: state.posts,
 filterText: state.filters.text
});
export default connect(mapStateToProps)(PostList);