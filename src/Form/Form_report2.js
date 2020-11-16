
import React from 'react';

import Modal from '../Components/Modal.js';

const port = 1337;

// const Modal = (props) => {
//     console.log("props.class in Modal = ");
//     console.log(props.class);
//     var className = "modal" + props.class;
//     if (props.statusCode === 200 || props.statusCode === 201 || props.statusCode === 204) {
//         return <div className={className + " success"}>{"Success: " + props.details}</div>
//     } else {
//         return <div className={className + " warning"}>{"Failure: " + props.details}</div>
//     }
// }

class FormReport2 extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in FormReport: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            mode: 'create',
            submitted: false,
            statusCode: 0,
            details: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    resetSubmitted = () => this.setState({mode: "edit", submitted: false, statusCode: 0, details: ""});

    componentDidMount() {
        console.log("%ccomponentDidMount Form_report2 = ", "color: orange; font-size: large");
        console.log("Form is submitted? ");
        console.log(this.state.submitted);
    }

    componentDidUpdate() {
        console.log("%ccomponentDidUpdate Form_report2 = ", "color: orange; font-size: large");
    }

    handleChange(event, tag = null) {
        // event.preventDefault();
        console.log("%cA change-event has happened!", "color: purple; font-size: x-large");

        if (this.state.submitted) {
            this.resetSubmitted();
        }

        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const value = target.value;
        const name = target.name;

        console.log("name = " + name);
        console.log("value = " + value);

        this.setState({
            [name]: value
        });

        // If change has happened in the select field
        if(tag === "select") {
            fetch('http://localhost:'+ port + '/dbreports/week/' + value, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                },
                // body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((result) => {
                console.log("Something has been fetched!!");
                console.log("result = ");
                console.log(result);
                var select = document.getElementById("id-select");
                console.log("select = ");
                console.log(select);
                console.log("select = ");
                console.log(select.value);

//                 if (array && array.length) {
//     // array and array.length are truthy
//     // ⇒ probably OK to process array
// }
// if (!Array.isArray(array) || !array.length) {
//   // array does not exist, is not an array, or is empty
//   // ⇒ do not attempt to process array
// }

                // if (result.data && result.data.length) {
                // If an array and is not empty
                if (Array.isArray(result.data) && result.data.length) {
                    console.log("result.data is an array and it is not empty!!");
                    document.getElementById("input-title").value = result.data[0].title !== null ? result.data[0].title : ""; //Set value on input field with id = "input-title"
                    document.getElementById("input-content").value = result.data[0].content !== null ? result.data[0].content : ""; //Set value on input field with id = "input-title"
                    this.setState({
                        title: result.data[0].title,
                        content: result.data[0].content !== null ? result.data[0].content : "",
                        mode: "edit"

                    });
                } else {
                    console.log("result.data is an array but it is empty!!");
                    document.getElementById("input-title").value = ""; //Set value on input field with id = "input-title"
                    document.getElementById("input-content").value = ""; //Set value on input field with id = "input-title"
                    this.setState({
                        // title: result.data[0].title,
                        // content: result.data[0].content !== null ? result.data[0].content : "",
                        mode: "create"
                    });
                }
                // this.sendDataToParent(result);
            })
        }

        console.log("this.state.mode in handleChange() = ");
        console.log(this.state.mode);

    }

    handleSubmit(event) {
        console.log("%cA submit-event has happened!", "color: purple; font-size: x-large;");
        alert('A form has been submitted for: ' + this.state.id);
        this.setState({submitted: true});
        this.props.updateDBReportsFormData(this.state.submitted);
        // console.log("A registration form was submitted from " + this.state.name);
        console.log("%cA report form was submitted from  = ", "color: purple; font-size: x-large;");
        console.log(this.state);
        if (this.state.mode === "create") {
            console.log("mode is CREATE!!");
            // This is sent to the SERVER
            fetch('http://localhost:'+ port + '/dbreports', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': this.props.token
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((result) => {
                console.log("Something has been fetched!!");
                console.log("result = ");
                console.log(result);
                this.props.updateDBReportsWithIds(this.state.id);

                console.log("result.data2 = ");
                console.log(result.data2);
                if(result.data2.status) {
                    this.setState({
                        statusCode: result.data2.status,
                        details: result.data2.details
                    })
                }
                // this.sendDataToParent(result);
            })
        } else if (this.state.mode === "edit") {
            console.log("mode is EDIT!!");
            // This is sent to the SERVER
            fetch('http://localhost:'+ port + '/dbreports', {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': this.props.token
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((result) => {
                console.log("Something has been fetched!!");
                console.log("result = ");
                console.log(result);

                console.log("result.data2 = ");
                console.log(result.data2);
                if(result.data2.status) {
                    this.setState({
                        statusCode: result.data2.status,
                        details: result.data2.details
                    })
                }
                // this.sendDataToParent(result);
            })
        }
        // fetch('http://localhost:'+ port + '/dbreports', {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        // })
        // .then((response) => response.json())
        // .then((result) => {
        //     console.log("Something has been fetched!!");
        //     console.log("result = ");
        //     console.log(result);
        //     // this.sendDataToParent(result);
        // })
    }
    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        console.log("A click-event has happened!");
        console.log("this.props in handleClick in From_report2 = ");
        console.log(this.props);

        console.log("this in FormReport2 handleClick()");
        console.log(this);

        this.props.toggleView();
    }

    render() {
        var className = "form" + this.props.class;
            console.log("this.state.submitted = ");
            console.log(this.state.submitted);
        // if (!this.state.submitted) {
            return (
                <div className="outer-wrap outer-wrap-form">
                <Modal class={this.state.submitted ? "" : " hidden"} statusCode={this.state.statusCode} details={this.state.details}/>
                <div className="inner-wrap inner-wrap-form">
                <form className={className} onSubmit={this.handleSubmit} onMouseUp={this.clearPressureTimer}>
                    <label>
                        Id:
                        <select name="id" value={this.state.id} id="id-select" onChange={(e) => this.handleChange(e, "select")} required>
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="1">kmom01</option>
                            <option value="2">kmom02</option>
                            <option value="3">kmom03</option>
                            <option value="4">kmom04</option>
                            <option value="5">kmom05</option>
                            <option value="6">kmom06</option>
                            <option value="10">kmom10</option>
                        </select>
                    </label>
                        <label>
                            Title:
                            <input className="form-input" id="input-title" type="text" name="title" value={this.state.title} onChange={this.handleChange} required/>
                        </label>
                        <label>
                            Text:
                            <textarea className="form-input" id="input-content" type="text" name="content" value={this.state.content} rows="10" col="20" onChange={this.handleChange}/>
                        </label>
                    <input className="form-input" type="submit" value="Submit" onClick={(event) => {event.preventDefault(); console.log("Submit button has been clicked!!!"); this.handleSubmit()}}/>

                </form>

                </div>
                </div>

            );

    }
}

export default FormReport2;
