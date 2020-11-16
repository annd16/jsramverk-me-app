
import React from 'react';

import DatePicker3 from '../DatePicker/DatePicker3.js';

import { getLocalDateInISOformat } from '../Calendar/functions.js';

import Modal from '../Components/Modal.js';

const port = 1337;

class Form_register extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in Form_register: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            date: '',
            datePickerOpen: false,
            selectedDate: null,
            selectedDate2: null,
            pwIsVisible: false,
            submitted: false,
            statusCode: 0,
            details: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.getSelectedDate = this.getSelectedDate.bind(this);
        this.showPW = this.showPW.bind(this);
    }

    toggleDatePicker = () => { console.log("%ctoggleDatePicker()", "color: purple; font-size: x-large"); this.setState({datePickerOpen: !this.state.datePickerOpen}) }

    resetSubmitted = () => this.setState({ submitted: false, statusCode: 0, details: ""});

    componentDidMount() {
        console.log("%ccomponentDidMount Form_register = ", "color: orange; font-size: large");
        console.log("Form is submitted? ");
        console.log(this.state.submitted);
    }

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

        // // event.stopPropagation();
        // // event.nativeEvent.stopImmediatePropagation();
        // console.log("%cA change-event has happened!", "color: purple; font-size: x-large");
        // this.setState({name: event.target.name});
        // this.setState({epost: event.target.epost});
        // this.setState({password: event.target.password});
        // this.setState({date: event.target.date});
        // this.setState({gdpr: event.target.gdpr});
    }

    handleSubmit(event) {

        console.log("%cA submit-event has happened!", "color: purple; font-size: x-large;");

        console.log("this = ");
        console.log(this);

        alert('A registration form has been submitted for: ' + this.state.name);
        this.setState({submitted: true});


        // If any field has been left out empty
        if (this.state.name === "" || this.state.email === "" || this.state.password === "") {
            this.setState({
                statusCode: 400,
                details: "Required field(s) have been left out!"
            })
            console.log("Empty strings!");
            return false;
        }
        // event.preventDefault();
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        console.log("%cA submit-event has happened!", "color: purple; font-size: x-large;");

        console.log("this = ");
        console.log(this);

        alert('A registration form has been submitted for: ' + this.state.name);
        this.setState({submitted: true});

        console.log("this.state = ");
        console.log(this.state);

        this.props.updateRegistrationFormData(this.state.submitted);

        console.log("%cA registration form was submitted from  = ", "color: purple; font-size: x-large;");
        console.log(this.state);
        fetch('http://localhost:'+ port + '/register', {
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

            // if(result.data2.status) {
            //     this.setState({
            //         statusCode: result.data2.status,
            //         details: result.data2.details
            //     })
            // }

            // if server-side validation fails:
            if(result.errors) {
                var errors = result.errors;
                console.log("result.errors is defined!!");
                console.log(result.errors);
                console.log(result.errors[0].msg);
                var msg = errors[0].msg + " for " + errors[0].param;
                this.setState({
                    statusCode: errors.status,
                    details: msg
                })

                console.log("result.data2 = ");
                console.log(result.data2);
            } else {
                console.log("result.errors is NOT defined!!");
                this.setState({
                    statusCode: result.data2.status,
                    details: result.data2.details
                })
                // this.props.history.push(this.props.prevLocation);  //KOLLA UPP DETTA!!
                setTimeout(() => {
                    this.props.history.push("/login");
                }, 8000)
            }
        }).catch((err) => {
            alert('Error when trying to register, please try again');
            console.log("An error was caught during feching data from the server!");
            console.log(err);
        })
        // this.props.history.push(this.props.prevLocation);  //KOLLA UPP DETTA!!
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

    handleDate(dataFromChild) {
        console.log("dataFromChild = ");
        console.log(dataFromChild);
        const date = dataFromChild;
        return date;
    }

    // getSelectedDate(dataFromChild) {
    //     console.log("getSelectedDate() called from child/grandchild");
    //     console.log("dataFromChild from child/grandchild");
    //     console.log(dataFromChild);
    //     const selDate = dataFromChild;
    //     this.setState({ selectedDate: selDate });           // selectedDate is a Date-object
    //     return selDate;
    // }


    getSelectedDate(dataFromChild) {
        console.log("getSelectedDate() called from child/grandchild");
        console.log("dataFromChild from child/grandchild");
        console.log(dataFromChild);
        var selectedDateISOformatted = getLocalDateInISOformat(dataFromChild);                // This is used in the form
        // const selDate = dataFromChild;


        this.setState({ selectedData: dataFromChild, selectedDate2: selectedDateISOformatted });           // selectedDate is a Date-object
        return selectedDateISOformatted;
    }




    showPW() {
        if (!this.state.pwIsVisible) {
            this.setState({pwIsVisible: true});
            this.timeout = setTimeout(() => {
                this.setState({pwIsVisible: false});
            }, 1000);
        }
    }

    render() {

        // Check this out - what is going on here??

        var re = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        var selectedDateISOformatted = "";
        var selectedDateAsISOstring = "";


        console.log("%cthis.state inside Form_register render = ", "color: purple; font-size: x-large;");
        console.log(this.state);

        if (this.state.selectedDate) {
            selectedDateISOformatted = getLocalDateInISOformat(this.state.selectedDate);                // This is used in the form

            console.log("%cselectedDateISOformatted = ", "color: purple; font-size: x-large;");
            console.log(selectedDateISOformatted);

            console.log("%ctypeof(selectedDateISOformatted) = ", "color: purple; font-size: x-large;");
            console.log(typeof(selectedDateISOformatted));      // A string

            selectedDateAsISOstring = this.state.selectedDate.toISOString();

            console.log("%cselectedDateAsISOstring = ", "color: purple; font-size: x-large;");
            console.log(selectedDateAsISOstring);


            // match() returns an array!!
            var selDateYYMMDD = selectedDateAsISOstring.match(re)[0];
            console.log("%cselectedDateAsISOstring = ", "color: purple; font-size: x-large;");
            console.log(selDateYYMMDD);
        }

        return (
            <div className="outer-wrap outer-wrap-form">
            <Modal class={this.state.submitted ? "" : " hidden"} statusCode={this.state.statusCode} details={this.state.details}/>
            <div className="inner-wrap inner-wrap-form">
            <form className="form" action="/" onSubmit={(event) => {event.preventDefault(); console.log("Form has been submitted!!!")}} onMouseUp={this.clearPressureTimer}>
                 <label>
                    Name:
                    <input className="form-input" type="text" name="name" onChange={this.handleChange} required/><span></span>
                </label>
                <label>
                    Email:
                    <input className="form-input" type="email" name="email" value={this.state.email} onChange={this.handleChange} required/><span></span>
                </label>
                <div className="tooltip pw">
                    <span className="tooltip-text pw">Click eye-icon to flash password.</span>
                    <label>
                        Password:
                        <input className="form-input" type={this.state.pwIsVisible === false ? "password" : "text"} name="password" value={this.state.password} onChange={this.handleChange} required/>
                        <span className="eye"><i id="pass-status" className={this.state.pwIsVisible === false ?  "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true" onClick={this.showPW}></i></span>

                    </label>
                </div>
                <label>
                    Date-of-Birth:
                    <input className="form-input" type="text" name="date" onChange={this.handleChange} onClick={this.handleClick} value={this.state.selectedDate2 !== null ? this.state.selectedDate2 : ""} required/><span></span>
                    <DatePicker3 datePickerOpen={this.state.datePickerOpen} handleDatePicker={this.handleDatePicker} callbackFromParent2={this.handleDate} getSelectedDate={this.getSelectedDate} getTandT={this.props.getTandT} timerIsOn={this.props.timerIsOn} intervalIsOn={this.props.intervalIsOn}/>
                </label>
                <div className="gdpr">
                    <input className="form-input" type="checkbox" name="gdpr" checked={this.state.checked} value={this.state.check} onClick={this.handleClick2} required/>
                    <div className="gdpr-text">I agree that my data is stored in a database.</div><span className="gdpr"></span>
                </div>
                <input className="form-input" type="submit" value="Submit" onClick={(event) => {event.preventDefault(); console.log("Submit button has been clicked!!!"); this.handleSubmit()}}/>

            </form>
            </div>
            </div>

        );
    }
}

export default Form_register;
