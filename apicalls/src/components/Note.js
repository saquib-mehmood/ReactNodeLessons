import React from 'react';
import '../App.css';

const Note = (props) => {
    const label = props.note.important ? "make not important"
    : "make important"
    const deleted = "Delete Note"
    return (
        <li>
            {props.note.content}
            <button onClick = {props.toggleImportance}>
                 {label}
            </button>
            <button onClick = {props.deleteComment}>
                {deleted}
            </button>
       </li>
    )
}








export default Note; 