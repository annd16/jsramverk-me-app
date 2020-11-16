
import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import ShowLocationAndHistory from '../Components/ShowLocationAndHistory.js';


import Modal from '../Components/Modal.js';


import { getLocalDateInISOformat } from '../Calendar/functions.js';

const port = 1337;


class Form_login extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in Form_login: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            email: '',
            password: '',
            pwIsVisible: false,
            submitted: false,
            statusCode: 0,
            details: ""
            // token: '',
            // userLoggedIn: false,
            // sendStatusToParent: this.props.sendStatusToParent,
            // sendTokenToParent:  this.props.sendTokenToParent
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.getSelectedDate = this.getSelectedDate.bind(this);
        this.showPW = this.showPW.bind(this);
    }

    // toggleDatePicker = () => { console.log("%ctoggleDatePicker()", "color: purple; font-size: x-large"); this.setState({datePickerOpen: !this.state.datePickerOpen}) }

    // resolveStateFromDate(date) {
    //     const isDateObject = isDate(date);
    //     const _date = isDateObject ? date : new Date();
    //     this.sendDataToParent()
    //
    //     return {
    //         current: isDateObject ? date : null,
    //         month: _date.getMonth() + 1,
    //         year: _date.getFullYear(),
    //     }
    // }
    //
    // resolveStateFromProps () {
    //     this.resolveStateFromDate(this.props.date);
    // }
    resetSubmitted = () => this.setState({ submitted: false, statusCode: 0, details: ""});

    componentDidUpdate() {
        console.log("componentDidUpdate in Form_login!");
        // this.setState({
        //     status: this.props.status,
        //     token: this.props.token
        // });

    }

    handleChange(event) {
        // this.setState({id: event.target.id});
        // this.setState({email: event.target.email});
        // this.setState({password: event.target.password});
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

        console.log("%cA submit-event has happened!", "color: purple; font-size: x-large;");
        alert('A Login form has been submitted from: ' + this.state.email);

        this.setState({submitted: true});

        // If either email and/or password field is empty
        if (this.state.email === "" || this.state.password === "") {
            this.setState({
                statusCode: 400,
                details: "Required field(s) have been left out!"
            })
            console.log("Empty strings!");
            return false;
        }
        console.log("this.state = ");
        console.log(this.state);


        console.log("this.state = ");
        console.log(this.state);

        this.props.updateLoginFormData(this.state.submitted);

        // console.log("A registration form was submitted from " + this.state.name);
        console.log("%cA login form was submitted from  = ", "color: purple; font-size: x-large;");
        console.log(this.state);
        fetch('http://localhost:'+ port + '/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify(this.state)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result.status);
            // console.log("result = ");
            // console.log(result);
            if (result.status === 200) {
                console.log("%cStatus 200!!", "color: orange; font-size: large");
                // this.props.history.push('/');
            } else {
                console.log("%cresult.errors", "color: orange; font-size: large");
                console.log(result.errors);
                // const error = new Error(result.errors);
                // throw error;
            }
            console.log("Something has been fetched!!");
            console.log("result = ");
            console.log(result);


            // if server-side validation fails:
            if(result.errors) {
                var errors = result.errors;
                console.log("result.errors is defined!!");
                console.log(result.errors);
                console.log(result.errors[0].msg);
                var msg = errors[0].msg + " for " + errors[0].param;
                this.setState({
                    statusCode: errors[0].status,
                    details: msg
                })

                console.log("result.data2 = ");
                console.log(result.data2);
            } else {
                console.log("result.errors is NOT defined!!");

                if(result.data2.rows) {
                    console.log("rows is defined!");
                    var user = result.data2.rows;
                    var userEmail = user.email;
                    var token = result.data2.token;
                    // this.setState({
                    //     userLoggedIn: true,
                    //     token: loggedInUser.token
                    // });
                    // console.log("this.state.userLoggedIn = ");
                    // console.log(this.state.userLoggedIn);
                    // console.log("loggedInUser.token = ");
                    // console.log(loggedInUser.token);
                    console.log("user = ");
                    console.log(user);
                    console.log("userEmail = ");
                    console.log(userEmail);
                    console.log("token = ");
                    console.log(token);

                    console.log("this.props = ");
                    console.log(this.props);
                    // this.props.sendStatusToParent(this.state.userLoggedIn);
                    // this.props.sendTokenToParent(this.state.token);

                    this.props.updateParent(user, true, token);
                    console.log("this.props.history = ");
                    console.log(this.props.history);

                    console.log("this.props.goBack = ");
                    console.log(this.props.goBack);

                    // if (this.props.goBack) {
                    //     console.log("this.props.goback is defined!");
                    //     this.props.history.go(this.props.goBack)
                    // } else {
                    //     // You can add a default action if a user lands on route from an external link
                    //     console.log("this.props.goback is not defined!");
                    //     this.props.history.push('/')
                    // }

                    console.log("this.props.prevLocation = ");
                    console.log(this.props.prevLocation);

                     // this.props.history.push(this.props.prevLocation);

                    // // this.props.history.push('/');
                    // this.props.history.go(-1);

                    this.setState({
                        statusCode: result.data2.status,
                        details: result.data2.details
                    })
                    // this.props.history.push(this.props.prevLocation);  //KOLLA UPP DETTA!!
                    setTimeout(() => {
                         this.props.history.push(this.props.prevLocation)
                    }, 8000);

                }

                // this.setState({
                //     statusCode: result.data2.status,
                //     details: msg
                // })
                // // this.props.history.push(this.props.prevLocation);  //KOLLA UPP DETTA!!
                // setTimeout(() => {
                //      this.props.history.push(this.props.prevLocation)
                // }, 10000);
            }

        // }).catch((err) => {
        //     alert('Error when trying to login, please try again');
        //     console.log("An error was caught during feching data from the server!");
        //     console.log(err);
        })
        // event.preventDefault();

    }
    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        console.log("A click-event has happened!");
        console.log("this in Form_login handleClick()");
        console.log(this);
        if (this.state.email === "" || this.state.password === "") {
            return false;
        }
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
        // this.props.sendStatusToParent(this.state.userLoggedIn);
        // this.props.sendTokenToParent(this.state.token);
        console.log("this.props in form_login render = ");
        console.log(this.props);
        console.log("this.state in form_login render = ");
        console.log(this.state);
        return (

            <div className="outer-wrap outer-wrap-form">
            <Modal class={this.state.submitted ? "" : " hidden"} statusCode={this.state.statusCode} details={this.state.details}/>
            <div className="inner-wrap inner-wrap-form">

            <form className="form" onSubmit={this.handleSubmit} onMouseUp={this.clearPressureTimer}>

            <ShowLocationAndHistory/>
                <label>
                    Email:
                    <input required="required" className="form-input" type="email" name="email" value={this.state.email} onChange={this.handleChange}/><span></span>
                </label>
                <div className="tooltip pw">
                    <span className="tooltip-text pw">Click eye-icon to flash password.</span>
                    <label>
                        Password:
                        <input required="required" className="form-input" type={this.state.pwIsVisible === false ? "password" : "text"} name="password" value={this.state.password} onChange={this.handleChange}/>
                        <span className="eye"><i id="pass-status" className={this.state.pwIsVisible === false ?  "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true" onClick={this.showPW}></i></span>

                    </label>
                </div>
                <input className="form-input" type="submit" value="Submit" onClick={(event) => {event.preventDefault(); console.log("Submit button has been clicked!!!"); this.handleSubmit(event)}}/>

            </form>

            </div>
            </div>
        );
    }
}

export default withRouter(Form_login);
