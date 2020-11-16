
import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';


import { getLocalDateInISOformat } from '../Calendar/functions.js';

const port = 1337;


class Form_logout extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in Form_login: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            email: '',
            password: '',
            pwIsVisible: false,
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
        if (this.state.email === "" || this.state.password === "") {
            return false;
        }
        console.log("this.state = ");
        console.log(this.state);
        console.log("%cA submit-event has happened!", "color: purple; font-size: x-large;");
        alert('A form has been submitted from: ' + this.state.email);
        // console.log("A registration form was submitted from " + this.state.name);
        console.log("%cA login form was submitted from  = ", "color: purple; font-size: x-large;");
        console.log(this.state);
        fetch('http://localhost:'+ port + '/logout', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify(this.state)
        })
        .then((response) => response.json())
        .then((result) => {
            // console.log("res.status = ");
            // console.log(result.status);
            // if (result.status === 200) {
            //     this.props.history.push('/');
            // } else {
            //     const error = new Error(result.error);
            //     throw error;
            // }
            console.log("Something has been fetched!!");
            console.log("result = ");
            console.log(result);
            if(result.rows) {
                var user = result.rows;
                var userEmail = result.rows.email;
                var token = result.token;
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
            }


        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
        // event.preventDefault();

    }

    handleSubmit2(event) {
        console.log("handleSubmit2!");
        this.props.updateParent(null, false, "");
         this.props.history.push(this.props.prevLocation)

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

            <form className="form" onSubmit={this.handleSubmit} onMouseUp={this.clearPressureTimer}>
                <input className="form-input" type="submit" value="Cancel" onClick={(event) => {event.preventDefault(); console.log("Cancel button has been clicked!!!"); this.handleSubmit(event)}}/>
                <input className="form-input" type="submit" value="Continue" onClick={(event) => {event.preventDefault(); console.log("Submit button has been clicked!!!"); this.handleSubmit2(event)}}/>

            </form>

        );
    }
}

export default withRouter(Form_logout);
