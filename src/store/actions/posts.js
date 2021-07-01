import axios from '../../axios-post';

export const addPost = (post)=>{
    return{
        type: 'ADD_POST',
        post: post
    };
};
export const removePost = (id)=>{
    return{
        type: 'REMOVE_POST',
        id: id
    }
};
export const editPost = (id, updates)=>{
    return{
        type: 'EDIT_POST',
        id,
        updates
    }
};
export const setPosts = (posts)=>{
    return{
        type: 'FETCH_POSTS',
        posts
    }
};
export const startAddPost = (post) =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.userId;
        axios.post(`/users/${uid}/posts.json`, post).then((res)=>{
            dispatch(addPost({
                ...post,
                id: res.data.name
            }));
        }).catch((err)=>{
        })
    } 
}
export const startEditPost = (id, updates) =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.userId;
        axios.put(`/users/${uid}/posts/${id}.json`, updates).then((res)=>{
            dispatch(editPost(id, updates));
        }).catch((err)=>{

        })
    } 
}
export const startRemovePost = (id) =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.userId;
        axios.delete(`users/${uid}/posts/${id}.json`).then((res)=>{
            dispatch(removePost(id));
        }).catch((err)=>{
        })
    } 
}
export const startSetPosts = () =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.userId;
        return axios.get(`https://my-app-ba0b0-default-rtdb.firebaseio.com/users/${uid}/posts.json`)
        .then((res)=>{
            const data = Object.keys(res.data).map(igKey=>{
                return {
                    id: igKey,
                    ...res.data[igKey]
                }
             });
            dispatch(setPosts(data));
        }).catch((err)=>{
            //
        })
    } 
}