import React from 'react';
import '../App.css';


const Form = (props) => {
    

    return (
        <form onSubmit = {props.handleSubmit}>
            <input 
                value = {props.inputValue}
                onChange = {props.handleChange}
            />
            <button type = "submit">save</button>
        </form>
    )
}






export default Form