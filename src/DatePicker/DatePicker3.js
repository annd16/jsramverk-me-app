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
        this.state = {
            calendarOpen: false,
            prevDate: null,
            year: 21,
            month: 2,
            day: "",
            date: null,
            selectedDate: null
        }

        console.log("%cthis.state in DatePicker3 constructor: ", "color: orange; font-size: large");
        console.log(this.state);

        this.getStateFromCalCtrl = this.getStateFromCalCtrl.bind(this);
    }

    toggleCalendar = () => { console.log("Inside toggleCalendar in DatePicker3!"); this.setState({calendarOpen: !this.state.calendarOpen}) }            // DOesn't work!!
    toggleCalendar2 = (status) => { console.log("Inside toggleCalendar2 in DatePicker3!"); this.setState({calendarOpen: status}) }

    handleChange = event => event.preventDefault()


    componentDidMount() {
        console.log("%ccomponentDidMount() - DatePicker3", "color: orange; font-size: large");
        console.log("%cprops in DatePicker3 componentDidMount(): ", "color: orange; font-size: large")
        console.log(this.props);
        console.log("%cstate in DatePicker3 componentDidMount(): ", "color: orange; font-size: large")
        console.log(this.state);
        // const date = this.props.date;
        // console.log("%cdate in DatePicker3 componentDidMount(): ", "color: orange; font-size: large")
        // console.log(date);      // undefined

        // If date is defined, then newDate will be a new Date object, otherwise it will be undefined
        // const newDate = date && new Date(date);
        const newDate = new Date();
        console.log("%cnewDate in DatePicker3 componentDidMount(): ", "color: orange; font-size: large")
        console.log(newDate);   // undefined

        var date = getLocalDateInISOformat(newDate);

        var year = newDate.getFullYear();
        // var month = newDate.getMonth() + 1;
        var month = newDate.getMonth();

        console.log("%cisDate(newDate) in DatePicker3 componentDidMount(): ", "color: orange; font-size: large")
        console.log(isDate(newDate));   // undefined

        isDate(newDate) && this.setState({
            date: getLocalDateInISOformat(newDate),
            year: year,
            month: month
        });

        console.log("%cstate2 in DatePicker3 componentDidMount(): ", "color: orange; font-size: large")
        console.log(this.state);   // date is still null!!
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("%ccomponentDidUpdate() - DatePicker3", "color: orange; font-size: large");
        console.log("this.props = ");  // function callbackFromParent()
        console.log(this.props);  // function callbackFromParent()
        console.log(this.prevProps);    // undefined
        console.log(this.prevState);    // undefined

        if (this.props.datePickerOpen !== prevProps.datePickerOpen) {
            console.log("%cthis.props.datePickerOpen has changed!!!", "color: orange; font-size: large");
            // this.toggleCalendar();
            this.toggleCalendar2(this.props.datePickerOpen);
            // this.props.handleDatePicker(this.state.calendarOpen);
            console.log("this.props after toggleCalendar() = ");  // function callbackFromParent()
            console.log(this.props);  // function callbackFromParent()
            console.log("%cstate in DatePicker3 update after toggle.Calendar(): ", "color: orange; font-size: x-large");
            console.log(this.state);
        }

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
        // this.props.handleDatePicker(this.state.calendarOpen);
        console.log("this.state inside DatePicker3 - render");
        console.log(this.state);
        if (this.props.datePickerOpen) {
            console.log("this.state.calendarOpen in DatePicker3 - render = ");
            console.log(this.state.calendarOpen);
            return (
                <div className="datepicker">
                    <div className="calendar">
                    <button className="exit" type="button" onClick={this.props.toggleDatePicker}><i id="pass-status" className={this.state.pwIsVisible === false ?  "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>X</button>
                        <CalendarCtrl3 getStateFromCalCtrl={this.getStateFromCalCtrl} getTandT={this.props.getTandT} timerIsOn={this.props.timerIsOn} intervalIsOn={this.props.intervalIsOn} calendarOpen={this.state.calendarOpen} route={"datepicker"}/>
                        <CalendarBody dateobj={{date: this.state.date}} year={this.state.year} month={this.state.month} getSelectedDate={this.props.getSelectedDate} calendarOpen={this.state.calendarOpen} toggleCalendar2={this.toggleCalendar2}/>
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
