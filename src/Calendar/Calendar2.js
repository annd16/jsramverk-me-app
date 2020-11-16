import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { weekdays, months } from './functions.js';
import { noOfDaysInMonth } from './functions.js';
import { weeksInCalendarView } from './functions.js';
import { createValidDateobject, getWeekNumber, checkIfTodaySetClass, defineStartDate, defineEndDate, isDate, getLocalDateInISOformat } from './functions.js';

import CalendarBody from '../Calendar/CalendarBody.js';
import CalendarCtrl3 from '../Calendar/CalendarCtrl3.js';

/*import functions from './functions.js';*/
import Timer from '../Timer/Timer.js';
import Sidebar from '../Components/Sidebar.js'

import PropTypes from 'prop-types';

import ShowLocationAndHistory from '../Components/ShowLocationAndHistory.js';

const sidenav = [
    ["", ""],
]


function isSameDay(date1, date2) {
    return date1.getTime() === date2.getTime();
}

class Calendar2 extends React.Component {
    constructor(props) {
        super(props);
        console.log("props in Calendar: ")
        console.log(props);
        // Should only assign directly to state here (on initialization)
        console.log("props.match.params = ");
        console.log(props.match.params);

        this.state = {
            // ...this.resolveStateFromProp(),
            data: "Calendar",
            date: new Date(),
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            // noOfDaysInMonth: 0,
            // selectedDate: null,
            // beginObj: null,
            // endObj: null
        }

        this.handleClickDate = this.handleClickDate.bind(this);
        this.getStateFromCalCtrl = this.getStateFromCalCtrl.bind(this);
        this.getTimeoutsAndTimersFromCalendarCtrl = this.getTimeoutsAndTimersFromCalendarCtrl.bind(this);
    }

    resolveStateFromDate(date) {
        const isDateObject = isDate(date);
        const _date = isDateObject ? date : new Date();

        return {
            current: isDateObject ? date : null,
            month: _date.getMonth() + 1,
            year: _date.getFullYear(),
        }
    }

    resolveStateFromProps () {
        this.resolveStateFromDate(this.props.date);
    }

    componentDidMount() {
        console.log("componentDidMount() - Calendar");
        const dateObj = new Date();
        /*const prevLocation = this.state.prevLocation;*/
        /*this.setState((prevLocation) => { prevLocation = history.location.pathname })*/
        console.log("this.props = ");
        console.log(this.props);
        console.log(this.props.getSelectedDate);
        console.log("this.props.match = ");
        console.log(this.props.match);
        console.log("this.state.data = " + this.state.data);
        var year, month;
        if (this.props.match.params.year) {
            year = parseInt(this.props.match.params.year);
        } else {
            year = dateObj.getFullYear();
            console.log("year = " + year);
        }
        if (this.props.match.params.year) {
            month = parseInt(this.props.match.params.month);
        } else {
            month = dateObj.getMonth();
            console.log("month = " + month);
        }

        const day = parseInt(this.props.match.params.day);
        this.setState({
            data: "Calendar2",
            year: year,
            month: month,
            day: day,
        });
        console.log("this.state = ");
        console.log(this.state);

        this.props.updateLayoutWithLocations(this.props.location);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate() - Calendar");
        console.log("prevProps = ");
        console.log(prevProps);
        console.log("prevState = ");
        console.log(prevState);
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log("componentDidUpdate() - Calendar");

        console.log("prevProps = ");
        console.log(prevProps);
        console.log("prevState = ");
        console.log(prevState);
        console.log("snapshot = ");
        console.log(snapshot);
        console.log("this.props = ");
        console.log(this.props);
        console.log("this.props.match = ");
        console.log(this.props.match);
        console.log(this.props.data);
        console.log(this.state.data);  // Göran
        console.log(prevProps.data);
        console.log(this.props.match.params.year);
        console.log(prevProps.match.params.year);

        const year1 = parseInt(this.props.match.params.year);
        const month1 = parseInt(this.props.match.params.month);
        const day1 = parseInt(this.props.match.params.day);

        console.log("year = " +  year1);
        console.log("month = " +  month1);
        console.log("day = " +  day1);

        const dateObj = createValidDateobject(year1, month1, day1);

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const day = dateObj.getDate();

        console.log("year = " +  year);
        console.log("month = " +  month);
        console.log("day = " +  day);

        console.log(this.props.match.params);
        console.log(prevProps.match.params);
        if (!isNaN(this.props.match.params.year) && !isNaN(this.props.match.params.month)) {
            if (this.props.match.params !== prevProps.match.params) {
                this.setState({
                    year: year,
                    month: month,
                    day: day
                });
                console.log("In if in componentDidUpdate!");
            }

            if (year !== year1 || month !== month1 || day !== day1) {
                console.log("NOT EQUAL!!");

                const link = "/calendar/" + year + "/" + month + "/" + day;

                this.props.history.push(link);
            }
        }

    }

    handleClickDate(year, month, event) {
        /* Necessary to prevent datepicker from closing after this method has been called */
        event.preventDefault();
        console.log("event = ");
        console.log(event);
        console.log(event.target);
        console.log(event.currentTarget);
        console.log(this);
        console.log("%cCurrent year = ", "color: green; font-size: x-large");
        console.log(year);
        console.log("Current month = ");
        console.log(month);
        /* Create dateobject */
        const dateObj = new Date(year, month, event.target.innerHTML);
        console.log(dateObj);
        alert('The date ' + getLocalDateInISOformat(dateObj) + ' was clicked.');
        console.log("%cthis.props = ");
        console.log(this.props);
        /*this.props.getSelectedDate(dateObj);*/

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


    getTimeoutsAndTimersFromCalendarCtrl(timeouts, intervals) {

        console.log("%ctimeouts = ", "color: gray; font-size: x-large");
        console.log(timeouts);
        console.log("%cintervals = ", "color: grey; font-size: x-large");
        console.log(intervals);

        this.setState({
            timeouts: timeouts,
            intervals: intervals,
        });
    }

    render() {
        console.log("Inside render in Calendar");
        console.log("this1 = ");
        console.log(this);

        console.log(this.state.year);
        console.log(this.state.month);
        console.log(this.state.day);
        console.log(typeof(this.state.year));
        const prevYear = parseInt(this.state.year) - 1;
        const nextYear = parseInt(this.state.year) + 1;
        const prevMonth = parseInt(this.state.month) - 1;
        const nextMonth = parseInt(this.state.month) + 1;

        const linkPrevY = "/calendar/" + prevYear + "/" + this.state.month + "/" + this.state.day;
        const linkNextY = "/calendar/" + nextYear + "/" + this.state.month + "/" + this.state.day;
        const linkPrevM = "/calendar/" + this.state.year + "/" + prevMonth + "/" + this.state.day;
        const linkNextM = "/calendar/" + this.state.year + "/" + nextMonth + "/" + this.state.day;

        const links = [
            [linkNextY, "\u2191"],
            [linkPrevY, "\u2193"],
            [linkNextM, "\u2191"],
            [linkPrevM, "\u2193"],
        ];


        console.log("this.state.data in Calendar render= " + this.state.data);
        /*const year = this.props.match.params.year;
        const month = this.props.match.params.month;
        const day = this.props.match.params.date;*/

        /* Decide what value to use for year and month, the ones stored in state or the incoming year and month params. */
        /* Validate the params to be sure they are numeric */

        var year, month;
        console.log(this.state.year);
        console.log(this.state.month);


        if (this.state.year !== "" && !isNaN(this.state.year)) {
            year = this.state.year;
            console.log("year1 = " + year);         // Calendar route
            console.log(typeof(year));
        } else if (this.props.match.params.year && !isNaN(this.props.match.params.year)) {
            year = parseInt(this.props.match.params.year);
            console.log("year2 = " + year);
        } else {
            const dateObj = new Date();
            year = dateObj.getFullYear();
            console.log("year3 = " + year);
        }
        if (this.state.month !== "" && !isNaN(this.state.month)) {
            month = this.state.month;
            console.log("month1 = " + month);       // Calendar route
        } else if (this.props.match.params.month && !isNaN(this.props.match.params.month)) {
            month = this.props.match.params.month;
            console.log("month2 = " + month);
        } else {
            const dateObj = new Date();
            month = dateObj.getMonth();
            console.log("month3 = " + month);
        }

        var beginObj = defineStartDate(new Date(year, month, 1));
        var endObj = defineEndDate(new Date(year, month, noOfDaysInMonth(year, month)));
        console.log(this.state.year);
        console.log(this.state.month);
        console.log(this.state.day);
        console.log(this.props.match.params.year);
        console.log(this.props.match.params.month);
        console.log(this.props.match.params.day);
        var that = this;
        return (
            <main className="main" onMouseUp={this.handleMouseUp}>
                <Sidebar sidenav={sidenav} optionalComp=<Timer/>/>
                <div className="outer-wrap outer-wrap-article">
                    <ShowLocationAndHistory/>
                    <div className="inner-wrap inner-wrap-article">
                        <article className="article" onClick={this.handleClick}>
                            <h2>Calendar</h2>
                            <div className="calendar" id="myPopup">
                                <CalendarCtrl3 getStateFromCalCtrl={this.getStateFromCalCtrl} getTandT={this.getTimeoutsAndTimersFromCalendarCtrl}  timerIsOn={this.props.timerIsOn} intervalIsOn={this.props.intervalIsOn} calendarOpen={this.state.calendarOpen}/>
                                <CalendarBody dateobj={{date: this.state.date}} year={this.state.year} month={this.state.month} getSelectedDate={this.props.getSelectedDate} calendarOpen={this.state.calendarOpen} toggleCalendar2={this.toggleCalendar2} route={"calendar"}/>
                            </div>
                        </article>
                    </div>
                </div>
            </main>
        )
    }
}

Calendar2.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChanged: PropTypes.func
}

export default withRouter(Calendar2);
