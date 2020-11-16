import React from 'react';
/*import { BrowserRouter as Router, Link, Route } from 'react-router-dom';*/
import { Link } from 'react-router-dom';


const Modal = (props) => {
    console.log("props in Modal = ");
    console.log(props);
    var className = "modal" + props.class;
    if (props.statusCode === 200 || props.statusCode === 201 || props.statusCode === 204) {
        return <div className={className + " success"}>{"Success: " + props.details}</div>
    } else {
        return <div className={className + " warning"}>{"Failure: " + props.details}</div>
    }
}

export default Modal;
