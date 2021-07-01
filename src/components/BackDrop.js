import React from 'react';
import '../styles/backDrop.css';

const BackDrop = (props) => {
    return(
        props.show ? <div className='backDrop' onClick={props.clicked}></div> : null
    );
}
export default BackDrop;