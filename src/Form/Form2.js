
import React from 'react';

import DatePicker3 from '../DatePicker/DatePicker3.js';

import { getLocalDateInISOformat } from '../Calendar/functions.js';

class Form2 extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in Form2: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            name: '',
            epost: '',
            password: '',
            date: '',
            datePickerOpen: false,
            selectedDate: null,
            pwIsVisible: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getSelectedDate = this.getSelectedDate.bind(this);
        this.showPW = this.showPW.bind(this);
    }

    toggleDatePicker = () => { console.log("%ctoggleDatePicker()", "color: purple; font-size: x-large"); this.setState({datePickerOpen: !this.state.datePickerOpen}) }


    handleChange(event) {
        this.setState({name: event.target.name});
        this.setState({epost: event.target.epost});
        this.setState({password: event.target.password});
        this.setState({date: event.target.date});
    }

    handleSubmit(event) {
        alert('A form has been submitted from: ' + this.state.name);
        event.preventDefault();
    }
    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        console.log("A click-event has happened!");
        this.toggleDatePicker();
        console.log("this in Form handleClick()");
        console.log(this);
    }

    handleClick2(event) {
        /*event.preventDefault();*/
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        console.log("The gdpr box has been clicked!");
        console.log("this in Form handleClick2()");
        console.log(this);

    }

    handleDatePicker(dataFromChild) {
        console.log("dataFromChild = ");
        console.log(dataFromChild);
        const isCalendarOpen = dataFromChild;
        return isCalendarOpen;
    }

    handleDate(dataFromChild) {
        console.log("dataFromChild = ");
        console.log(dataFromChild);
        const date = dataFromChild;
        return date;
    }

    getSelectedDate(dataFromChild) {
        console.log("getSelectedDate()");
        const selDate = dataFromChild;
        this.setState({ selectedDate: selDate });
        return selDate;
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

        var re = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        var selectedDateISOformatted = "";
        var selectedDateAsISOstring = "";

        if (this.state.selectedDate) {
            selectedDateISOformatted = getLocalDateInISOformat(this.state.selectedDate);

            selectedDateAsISOstring = this.state.selectedDate.toISOString();

            var selDateYYMMDD = selectedDateAsISOstring.match(re);
            console.log("%cselectedDateAsISOstring = ", "color: purple; font-size: x-large;");
            console.log(selDateYYMMDD);
        }

        return (
            <form className="form" onSubmit={this.handleSubmit} onMouseUp={this.clearPressureTimer}>
                 <label>
                    Name:
                    <input className="form-input" type="text" name={this.state.name} onChange={this.handleChange} required/><span></span>
                </label>
                <label>
                    E-post:
                    <input className="form-input" type="email" epost={this.state.epost} onChange={this.handleChange} required/><span></span>
                </label>
                <div className="tooltip pw">
                    <span className="tooltip-text pw">Click eye-icon to flash password.</span>
                    <label>
                        Password:
                        <input className="form-input" type={this.state.pwIsVisible === false ? "password" : "text"} password={this.state.password} onChange={this.handleChange} required/>
                        <span className="eye"><i id="pass-status" className={this.state.pwIsVisible === false ?  "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true" onClick={this.showPW}></i></span>

                    </label>
                </div>
                <label>
                    Date-of-Birth:
                    <input className="form-input" type="text" date={this.state.date} onChange={this.handleChange} onClick={this.handleClick} value={this.state.selectedDate !== "undefined" ? selectedDateISOformatted : ""} required/><span></span>
                    <DatePicker3 datePickerOpen={this.state.datePickerOpen} callbackFromParent={this.handleDatePicker} callbackFromParent2={this.handleDate} getSelectedDate={this.getSelectedDate} getTandT={this.props.getTandT} timerIsOn={this.props.timerIsOn} intervalIsOn={this.props.intervalIsOn} toggleDatePicker={this.toggleDatePicker}/>
                </label>
                <div className="gdpr">
                    <input className="form-input" type="checkbox" name="gdpr" value={this.state.check} onChange={this.handleChange} onClick={this.handleClick2} required/>
                    <div className="gdpr-text">I agree that my data is stored in a database.</div><span className="gdpr"></span>
                </div>
                <input className="form-input" type="submit" value="Submit" />

            </form>

        );
    }
}

export default Form2;
