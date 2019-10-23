import React from 'react';
import PropTypes from 'prop-types';


import CalendarBody from '../Calendar/CalendarBody.js';
import CalendarCtrl3 from '../Calendar/CalendarCtrl3.js';

import { isDate, getLocalDateInISOformat } from '../Calendar/functions.js';


class DatePicker3 extends React.Component {

    constructor(props) {
        super(props);
        console.log("%cprops in DatePicker3: ", "color: orange; font-size: large");
        console.log(props);
        // Should only assign directly to state here (initialization)
        /*console.log("props.match.params = ");
        console.log(props.match.params);*/
        /*state = {
            ...this.resolveStateFromProp()
        };*/
        this.state = {
            calendarOpen: false,
            prevDate: null,
            year: this.props.year,
            month: this.props.month,
            day: this.props.day,
            date: this.props.date,
        }

        console.log("%cthis.state in DatePicker3: ", "color: orange; font-size: large");
        console.log(this.state);

        this.getStateFromCalCtrl = this.getStateFromCalCtrl.bind(this);
    }

    toggleCalendar = () => this.setState({calendarOpen: !this.state.calendarOpen})

    handleChange = event => event.preventDefault()


    componentDidMount() {
        console.log("componentDidMount() - DatePicker3");
        console.log("%cprops in DatePicker3 mount: ", "color: orange, font-size: large")
        console.log(this.props);
        console.log("%cstate in DatePicker3 mount: ", "color: orange, font-size: large")
        console.log(this.state);
        const date = this.props.date;
        const newDate = date && new Date(date);

        isDate(newDate) && this.setState({date: getLocalDateInISOformat(newDate)});
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate() - DatePicker3");
        console.log(this.props);  // function callbackFromParent()
        console.log(this.prevProps);    // undefined
        console.log(this.prevState);    // undefined

        /*const prevDate = this.prevProps;*/


        console.log("%cstate in DatePicker3 update: ", "color: orange; font-size: x-large");
        console.log(this.state);
    }

    getStateFromCalCtrl(date, year, month) {
        console.log("dataFromChild in getStateFromCalCtrl = ");
        console.log(date);
        console.log(year);
        console.log(month);
        console.log("getStateFromCalCtrl()");
        this.setState({ date: date,  year: year, month: month});
        console.log("this.state in getStateFromCalCtrl = ");
        console.log(this.state);
    }

    render() {
        this.props.callbackFromParent(this.state.calendarOpen);
        console.log("this.state inside DatePicker3 - render");
        console.log(this.state);
        if (this.props.datePickerOpen) {
            console.log("this.state.calendarOpen = ");
            console.log(this.state.calendarOpen);
            return (
                <div className="datepicker">
                    <div className="calendar">
                    <button className="exit" type="button" onClick={this.props.toggleDatePicker}><i id="pass-status" className={this.state.pwIsVisible === false ?  "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>X</button>
                        <CalendarCtrl3 getStateFromCalCtrl={this.getStateFromCalCtrl} getTandT={this.props.getTandT} timerIsOn={this.props.timerIsOn} intervalIsOn={this.props.intervalIsOn}/>
                        <CalendarBody dateobj={{date: this.state.date}} year={this.state.year} month={this.state.month} getSelectedDate={this.props.getSelectedDate}/>
                    </div>
                </div>
            );
        } else {
            console.log("this.state.calendarOpen = ");
            console.log(this.state.calendarOpen);
            return null;
        }

    }
}

DatePicker3.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onDateChanged: PropTypes.func
}

export default DatePicker3;
