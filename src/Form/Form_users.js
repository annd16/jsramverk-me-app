
import React from 'react';

const port = 1337;

class FormDisplayUsers extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in Table: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            email: '',
            submitted: false,
            statusCode: 0,
            details: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.sendDataToParent = this.sendDataToParent.bind(this);
        this.showPW = this.showPW.bind(this);
    }

    resetSubmitted = () => this.setState({ submitted: false, statusCode: 0, details: ""});

    handleChange(event) {
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
    }

    handleSubmit(event) {
        // event.preventDefault();
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        console.log("%cA submit-event has happened!", "color: purple; font-size: x-large;");
        alert('A form has been submitted from: ' + this.state.email);

        this.setState({submitted: true});
        this.props.updateUsersWithSubmissionData(this.state.submitted, []);
        // console.log("A registration form was submitted from " + this.state.name);
        console.log("%cA form was submitted from  = ", "color: purple; font-size: x-large;");
        console.log(this.state);
        fetch('http://localhost:'+ port + '/users', {
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
            if (result.data2.rows) {
                this.props.updateUsersWithSubmissionData(this.state.submitted, result.data2.rows);
            }
        })
        // event.preventDefault();

    }
    handleClick(event) {
        // event.preventDefault();
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        console.log("%cA click-event has happened!", "color: purple; font-size: x-large");
        this.toggleDatePicker();
        console.log("this in Form handleClick()");
        console.log(this);
    }

    handleClick2(event) {
        // event.preventDefault();      // Doesn't work if this is uncommented
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        console.log("%cA click2-event has happened!", "color: purple; font-size: x-large");
        console.log("The gdpr box has been clicked!");
        console.log("this in Form handleClick2()");
        console.log(this);

    }

    showPW() {
        if (!this.state.pwIsVisible) {
            this.setState({pwIsVisible: true});
            this.timeout = setTimeout(() => {
                this.setState({pwIsVisible: false});
            }, 1000);
        }
    }

    // sendDataToParent(result) {
    //     // this.props.getExpressDataFromChild(result);
    //     this.props.parentCallback(result);
    // }

    render(result) {

        return (
            <form className="form" action="/" onSubmit={(event) => {event.preventDefault(); console.log("Form has been submitted!!!")}} onMouseUp={this.clearPressureTimer}>
                <input className="form-input" type="submit" value="Display Users" onClick={(event) => {event.preventDefault(); console.log("Submit button has been clicked!!!"); this.handleSubmit()}}/>

            </form>

        );
    }
}

export default FormDisplayUsers;
