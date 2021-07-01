import React, {useState} from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
import {setTextFilter} from '../store/actions/filters';
import '../styles/container.css';
import '../styles/dashboard.css';

const Dashboard = (props) => {
    const [filterBy, setFilterBy] = useState('By Title');
    const addPostHandler = ()=>{
        props.history.push('./create');
    };
    const searchChangeHandler = (e)=>{
        const text = e.target.value;
        props.filterByText(text);
    };
    const filterChangeHandler = (e) =>{
        const value = e.target.value;
        setFilterBy(value)
    }
    return(
        <div className='container'>
            <h2 className='pageHeader'>Dashboard</h2>
            <div className='filters'>
            <input 
            type='text' 
            placeholder='Search posts'
            onChange = {searchChangeHandler} 
            autoFocus
            ></input>
            <select onChange={filterChangeHandler}>
                <option>By Title</option>
                <option>By Content</option>
            </select>
            <button onClick={addPostHandler}>Add Post</button>
            </div>
            <PostList filter = {filterBy}/>
        </div>
    );
};
const mapDispatchToProps = dispatch => ({
    filterByText: (text) => dispatch(setTextFilter(text))
});
export default connect(null, mapDispatchToProps)(Dashboard);