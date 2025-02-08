import React from 'react'
import { nanoid } from '@reduxjs/toolkit';
import './Modal.css';

export const Modal = ({ message, alertType, id, onClose }) => {
    return (
        <div key={id} className='Modal-overlay'>
            <div className={`Modal`}>
                <h3>{message}</h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
