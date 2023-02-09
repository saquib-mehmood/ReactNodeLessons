import React from 'react';
import Button from "react-bootstrap/Button";

const Note = (props) => {
    const label = props.note.important ? "make not important"
    : "make important"
    const deleted = "Delete Note"
    return (
        <li>
            {props.note.content}
            <Button variant = "info" style = {{margin: 10}} 
                onClick = {props.toggleImportance}>
                 {label}
            </Button>
            <Button variant = "danger" style = {{margin: 10}} 
                onClick = {props.deleteComment}>
                {deleted}
            </Button>
       </li>
    )
}








export default Note; 