import React from 'react';
import '../styles/modal.css';
import BackDrop from './BackDrop';

const Modal = (props)=>{
    return(
        <React.Fragment>
        <div 
        className='modal' 
        style={{
            transform: props.active ? 'translateY(0)': 'translateY(-100vh)',
            opacity: props.active ? 1 : 0
        }}>{props.children}</div>
         <BackDrop show={props.active} clicked = {props.closeModal}/>
    </React.Fragment>
    );
}
export default Modal;