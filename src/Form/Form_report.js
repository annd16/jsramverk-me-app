
import React from 'react';

const port = 1337;

class FormReport extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in FormReport: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            mode: 'create'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event, tag = null) {
        // event.preventDefault();
        console.log("%cA change-event has happened!", "color: purple; font-size: x-large");
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
            fetch('http://localhost:'+ port + '/dbreport/' + value, {
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
                    document.getElementById("input-title").value = result.data[0].title; //Set value on input field with id = "input-title"
                    document.getElementById("input-content").value = result.data[0].content; //Set value on input field with id = "input-title"
                    this.setState({
                        title: result.data[0].title,
                        content: result.data[0].content,
                        mode: "edit"
                    });
                }
                // this.sendDataToParent(result);
            })
        }



        // if(choice) {
        //     console.log("The chosen object = ");
        //     console.log(choice);
        // }
    }

    handleSubmit(event) {
        console.log("%cA submit-event has happened!", "color: purple; font-size: x-large;");
        alert('A form has been submitted for: ' + this.state.id);
        // console.log("A registration form was submitted from " + this.state.name);
        console.log("%cA registration form was submitted from  = ", "color: purple; font-size: x-large;");
        console.log(this.state);
        if (this.state.mode === "create") {
            fetch('http://localhost:'+ port + '/dbreports', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((result) => {
                console.log("Something has been fetched!!");
                console.log("result = ");
                console.log(result);
                // this.sendDataToParent(result);
            })
        } else if (this.state.mode === "edit") {
            fetch('http://localhost:'+ port + '/dbreports', {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((result) => {
                console.log("Something has been fetched!!");
                console.log("result = ");
                console.log(result);
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
        console.log("this.props in handleClick in From_report = ");
        console.log(this.props);

        console.log("this in FormReport handleClick()");
        console.log(this);

        this.props.toggleView();
    }

    render() {
        var className = "form" + this.props.class;
        return (
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

        );
    }
}

export default FormReport;
