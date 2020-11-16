import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { thisYear, thisMonth } from './functions.js';
import { months } from './functions.js';

import { isDate, getPreviousYear, getPreviousMonth, getNextYear, getNextMonth } from './functions.js';
/*import functions from './functions.js';*/

import PropTypes from 'prop-types';
// Get ReactDOM
import ReactDOM from "react-dom";


/*const mouseClickEvents = ['mousedown', 'click', 'mouseup'];*/
const mouseUpEvents = ['mouseup'];



function isSameDay(date1, date2) {
    return date1.getTime() === date2.getTime();
}

/*function createCalendarLink(year, month, day) {
/*return "/registration/" + year + "/" + month + "/" + day;*/
/*return "/registration/";
}*/

class CalendarCtrl3 extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in CalendarCtrl3: ", "color: blue; font-size: x-large");
        console.log(props);
        this.JSXLinkYNext = React.createRef();
        this.JSXLinkYPrev = React.createRef();
        this.spanYNext = React.createRef();
        this.spanYPrev = React.createRef();

        /*console.log("props.match.params = ");
        console.log(props.match.params);*/
        /*state = {
        ...this.resolveStateFromProp()
    };*/

    // Should only assign directly to state here (initialization)
    this.state = {                                      // Constructor is called also when re-opening the datepicker so the values are initialized again with current date, year and month
        /*...this.resolveStateFromProps(),*/
        data: "CalendarCtrl3",
        date: new Date(),
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),

        timerIsOn: false,
        intervalIsOn: false,
    }

    console.log("%c this.state in CalendarCtrl3 = ", "color: blue; font-size: large;");
    console.log(this.state);
    console.log(JSON.stringify(this.state.date));
    console.log(this.state.date.getFullYear());


    this.handleClickDate2 = this.handleClickDate2.bind(this);

    this.handlePressure = this.handlePressure.bind(this);
    this.clearPressureTimer = this.clearPressureTimer.bind(this);

    this.handleNextYear = this.handleNextYear.bind(this);
    this.handlePreviousYear = this.handlePreviousYear.bind(this);
    this.gotoNextYear = this.gotoNextYear.bind(this);
    this.gotoPreviousYear = this.gotoPreviousYear.bind(this);

    this.simulateMouseUpEvent = this.simulateMouseUpEvent.bind(this);
    this.handleClickSpan = this.handleClickSpan.bind(this);

}

goToNextYearCalls = 0;
componentDidMountCalls = 0;
componentDidUpdateCalls = 0;
timeoutCalls = 0;

pressureTimeouts = [];
pressureIntervals = [];


getJSXElement() {
    const node = ReactDOM.findDOMNode(this);
    console.log("%cPressure node = ", "color: magenta; font-size: large");
    return node;
}

simulateMouseUpEvent(element){
    console.log("%csimulateMouseUpEvent - pressure!", "color: magenta; font-size: large");
    console.log("element = ");
    console.log(element);
    mouseUpEvents.forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
        )
    );
}


gotoNextYear = (year, month) => {
    this.goToNextYearCalls +=1;
    console.log("%cgotoNextYear(year, month)", "color: red; font-size: x-large");
    /*console.log("year = ");
    console.log(year);
    console.log("month =");
    console.log(month);*/
    const { nextYear, nextMonth } = getNextYear(year, month);
    const dateObj = new Date(nextYear, nextMonth);
    this.setState({date: dateObj, year: nextYear, month: nextMonth});
    this.props.getStateFromCalCtrl(dateObj, nextYear, nextMonth);
}

gotoPreviousYear = (year, month) => {
    this.goToNextYearCalls +=1;
    console.log("%cgotoPreviousYear(year, month)", "color: red; font-size: x-large");
    /*console.log("year = ");
    console.log(year);
    console.log("month =");
    console.log(month);*/
    const { prevYear, prevMonth } = getPreviousYear(year, month);
    const dateObj = new Date(prevYear, prevMonth);
    this.setState({date: dateObj, year: prevYear, month: prevMonth});
    this.props.getStateFromCalCtrl(dateObj, prevYear, prevMonth);
}

handlePressure = (fn) => {
    console.log("%cInside handlePressure()", "color: red; font-size: x-large");
    console.log("fn = ");
    console.log(fn);

    console.log("!this.state.timerIsOn = ");
    console.log(!this.state.timerIsOn);

    if (typeof(fn) === "function") {
        console.log("%cfn is a function!", "color: red; font-size: x-large");
        fn();
        var timeoutCallsInner = 0;
        this.pressureTimeout = setTimeout(() => {
            var that = this;        /* Important! */
            console.log("%cInside this.pressureTimeout", "color: red; font-size: x-large");
            that.timeoutCalls += 1;
            timeoutCallsInner += 1;

            /*var node = that.getJSXElement();*/

            /*// Get child nodes
            if (node instanceof HTMLElement) {
            const element = node.querySelector('.linkelink');
        }*/

        console.log("%that.timeoutCalls = ", "color: red; font-size: x-large");
        console.log(that.timeoutCalls);
        console.log(timeoutCallsInner);

        if (that.timeoutCalls > 3) {
            /*var element = document.querySelector(".linkelink");*/
            /*console.log("this._link = ");
            console.log(this._link);
            this.simulateMouseUpEvent(this._link);*/

            console.log("that.spanYNext.current =  ");
            console.log(this.spanYNext.current);

            that.simulateMouseUpEvent(that.spanYNext.current);

            /*this.JSXLink.current.mouseUp();*/
        }

        that.pressureTimer = setInterval(fn, 100);  /* The time in milliseconds between the incremental or decremental changes */

        console.log("%cthat.pressureTimer inside setTimeout in handlePressure = ", "color: red; font-size: large");
        console.log(that.pressureTimer);
        that.pressureIntervals.push(that.pressureTimer);

    }, 500);     /* The time in milliseconds before starting to apply the pressure i.e. step up or down in years AFTER the very first change upon click.*/


    this.pressureTimeout2 = setTimeout(() => {
        clearTimeout();
        clearInterval();
    }, 2500);     /* The time in milliseconds before starting to apply the pressure i.e. step up or down in years AFTER the very first change upon click.*/


    this.setState({timerIsOn: true, intervalIsOn: true});

    console.log("%cthis.pressureTimeout inside handlePressure = ", "color: red; font-size: large");
    console.log(this.pressureTimeout);
    console.log("%cthis.pressureTimer inside handlePressure = ", "color: red; font-size: large");
    console.log(this.pressureTimer);

    /* Store id:s in two arrays: */
    this.pressureTimeouts.push(this.pressureTimeout);
    /*this.pressureIntervals.push(this.pressureTimer);*/

    console.log("%cpressureTimeouts = ", "color: red; font-size: large");
    console.log(this.pressureTimeouts);
    console.log("%cpressureIntervals = ", "color: red; font-size: large");
    console.log(this.pressureIntervals);

    this.props.getTandT(this.pressureTimeouts, this.pressureIntervals);
}
}

clearPressureTimer = () => {
    /*clearPressureTimer = (year, month) => {*/
    console.log("%cInside clearPressureTimer()", "color: red; font-size: x-large");
    console.log("%cthis.pressureTimeout = ", "color: red; font-size: large");
    console.log(this.pressureTimeout);
    console.log("%cthis.pressureTimer = ", "color: red; font-size: large");
    console.log(this.pressureTimer);
    if(this.pressureTimer) {
        console.log("The pressure timer will be stopped!");
        this.pressureTimer && clearInterval(this.pressureTimer);
        this.pressureTimeout && clearTimeout(this.pressureTimeout);
        console.log("myFuncCalls = " + this.myFuncCalls);
        /*this.props.getStateFromCalCtrl(this.state.date, year, month);*/

    } else {
        /*clearInterval();
        clearTimeout();*/
        console.log("No pressure timer started!!");
    }

    this.pressureTimeouts.forEach((element) => {
        clearTimeout(element);
    });
    this.pressureIntervals.forEach((element) => {
        clearTimeout(element);
    });

    this.pressureTimeouts = [];
    this.pressureIntervals = [];
    this.setState({timerIsOn: false, intervalIsOn: false});
    /*this.timeoutCalls = 0;*/
}

handleClickSpan(e) {
    console.log("%cA click event on arrow-up span", "color: brown; font-size: x-large");
    e.preventDefault();
    this.clearPressureTimer();
}


infoMessage() {
    console.log("INFO: A pressure timer seems to have already been started!");
}

handleNextYear(e) {
    console.log("handleNextYear(year, month, e)");
    console.log("%cevent = ", "color: darkred; font-size: x-large");
    console.log(e);
    console.log(e.nativeEvent);
    /*alert('A mouse down event has happened on year up-arrow!');*/
    if (e.nativeEvent !== "TouchEvent") {
        e.preventDefault();
    }

    console.log("typeof(this.gotoNextYear) = ");
    console.log(typeof(this.gotoNextYear));
    /*const fn = evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth;*/
    /*if (!this.state.timerIsOn) {*/
    console.log("A new pressure timer will be started!");
    const fn = () => this.gotoNextYear(this.state.year, this.state.month);
    console.log("fn = ");
    console.log(fn);
    console.log("typeof(fn) = ");
    console.log(typeof(fn));
    this.handlePressure(fn);
}

handlePreviousYear(e) {

    console.log("handlePreviousYear(year, month, e)");
    /*alert('A mouse down event has happened on year up-arrow!');*/
    e.preventDefault();

    console.log("typeof(this.gotoPreviousYear) = ");
    console.log(typeof(this.gotoPreviousYear));
    /*const fn = evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth;*/
    /*if (!this.state.timerIsOn) {*/
    console.log("A new pressure timer will be started!");
    const fn = () => this.gotoPreviousYear(this.state.year, this.state.month);
    console.log("fn = ");
    console.log(fn);
    console.log("typeof(fn) = ");
    console.log(typeof(fn));
    this.handlePressure(fn);
    console.log("%cevent = ", "color: lilac; font-size: x-large");
    console.log(e);
}

handleClickLinkNextY(year, month, e) {
    e.preventDefault();
    /*alert('The link NextY was clicked.');*/
    console.log("event = ");
    console.log(e);
    const { nextYear, nextMonth } = getNextYear(year, month);
    console.log("nextYear = " + nextYear);
    console.log("nextMonth = " + nextMonth);
    const dateObj = new Date(nextYear, nextMonth);
    this.setState({
        date: dateObj,
        year: nextYear,
        month: nextMonth,
    })
    // console.log(this.props.getStateFromCalCtrl);
    /* Have to have nextYear and nextMonth here, because the state has not yet been updated */
    this.props.getStateFromCalCtrl(dateObj, nextYear, nextMonth);
}

handleClickLinkPrevY(year, month, e) {
    e.preventDefault();
    /*alert('The link PrevY was clicked.');*/
    console.log("event = ");
    console.log(e);
    const { prevYear, prevMonth } = getPreviousYear(year, month);
    console.log("prevYear = " + prevYear);
    console.log("prevMonth = " + prevMonth);
    const dateObj = new Date(prevYear, prevMonth);
    this.setState({
        date: dateObj,
        year: prevYear,
        month: prevMonth,
    })
    this.props.getStateFromCalCtrl(dateObj, prevYear, prevMonth);
}


handleClickLinkNextM(year, month, e) {
    e.preventDefault();
    /*alert('The link NextM was clicked.');*/
    console.log("event = ");
    console.log(e);
    const { nextYear, nextMonth } = getNextMonth(year, month);
    console.log("nextYear = " + nextYear);
    console.log("nextMonth = " + nextMonth);
    const dateObj = new Date(nextYear, nextMonth);
    this.setState({
        date: dateObj,
        year: nextYear,
        month: nextMonth,
    })
    this.props.getStateFromCalCtrl(dateObj, nextYear, nextMonth);
}

handleClickLinkPrevM(year, month, e) {
    e.preventDefault();
    /*alert('The link PrevM was clicked.');*/
    console.log("event = ");
    console.log(e);
    const { prevYear, prevMonth } = getPreviousMonth(year, month);

    console.log("prevYear = " + prevYear);
    console.log("prevMonth = " + prevMonth);
    const dateObj = new Date(prevYear, prevMonth);
    this.setState({
        date: dateObj,
        year: prevYear,
        month: prevMonth,
    })
    this.props.getStateFromCalCtrl(dateObj, prevYear, prevMonth);
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

resolveStateFromProp () {
    console.log("%cresolveStateFromProp in calendarCtrl3!", "color: purple; font-size: large");
    this.resolveStateFromDate(this.props.date);
}


componentDidMount() {
    console.log("%ccomponentDidMount() - CalendarCtrl3", "color: purple; font-size: x-large");
    this.componentDidMountCalls += 1;
    console.log(this.componentDidMountCalls);
}

getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate() - CalendarCtrl3");
    console.log("prevProps = ");
    console.log(prevProps);
    console.log("prevState = ");
    console.log(prevState);
    return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {

    console.log("%ccomponentDidUpdate() - CalendarCtrl3", "color: purple; font-size: x-large");
    console.log("prevProps = ");
    console.log(prevProps);
    console.log("prevState = ");
    console.log(prevState);
    this.componentDidUpdateCalls += 1;
    console.log(this.componentDidUpdateCalls);

}

handleClickDate2(year, month, event) {
    /* Necessary to prevent datepicker from closing after this method has been called */
    event.preventDefault();
    alert('The date was clicked.');
    console.log("event = ");
    console.log(event);
    console.log(event.target);
    console.log(event.currentTarget);
    console.log(this);
    console.log("%cCurrent year = ", "color: green; font-size: x-large");
    console.log(year);
    console.log("Current month (0-11) = ");
    console.log(month);
    console.log("Current month (1-12) = ");
    console.log(month+1);
    /* Create dateobject */
    const dateObj = new Date(year, month, event.target.innerHTML);
    console.log(dateObj);
    console.log("%cthis.props = ", "color: green; font-size: x-large");
    console.log(this.props);
    this.props.getSelectedDate(dateObj);
}

render() {
    console.log("Inside render in CalendarCtrl3");

    const linkNextY = "/registration/";
    const linkPrevY = "/registration/";
    const linkNextM = "/registration/";
    const linkPrevM = "/registration/";


    const links = [
        [linkNextY, "↑"],
        [linkPrevY, "\u2193"],
        [linkNextM, "\u2191"],
        [linkPrevM, "\u2193"],
    ];

    console.log("this.state.year = ");
    console.log(this.state.year);
    console.log("this.state.month = ");
    console.log(this.state.month);

    var route = this.props.route;
    /*var that = this;*/

    if(route === "datepicker") {
        return (
            <div className='calendar-ctrl'>
                <h3 className='year'>{this.state.year} </h3>
                <div className="tooltip">
                    <span className="tooltip-text">To fast-forward, keep mouse button pressed, to stop, release button.</span>
                    <span className="span arrow-up" ref={this.spanYNext} onMouseDown={!this.state.timerIsOn && this.state.year !== thisYear ? (e) => this.handleNextYear(e) : this.infoMessage} onTouchStart={!this.state.timerIsOn && this.state.year !== thisYear ? (e) => this.handleNextYear(e) : this.infoMessage} onMouseUp={this.clearPressureTimer} onTouchEnd={this.clearPressureTimer} onClick={this.handleClickSpan}>
                        <Link to={links[0][0]} ref={this.JSXLinkYNext} className="link arrow-up"  onMouseUp={this.clearPressureTimer} onClick={(e) => { console.log("A click event on arrow-up"); e.preventDefault()}}>{links[0][1]}</Link>
                    </span>
                    <span className="span arrow-down" ref={this.spanYPrev} onMouseDown={!this.state.timerIsOn ? (e) => this.handlePreviousYear(e) : this.infoMessage} onMouseUp={this.clearPressureTimer} onTouchStart={!this.state.timerIsOn && this.state.year !== thisYear ? (e) => this.handlePreviousYear(e) : this.infoMessage} onTouchEnd={this.clearPressureTimer} onClick={this.handleClickSpan}>
                        <Link ref={this.JSXLinkYPrev} className="link arrow-down" to={links[1][0]} onMouseUp={this.clearPressureTimer} onClick={(e) => { console.log("A click event on arrow-down"); e.preventDefault()}}>{links[1][1]}</Link>
                    </span>
                </div>
                <h3 className='month'>{months[this.state.month][0]}</h3>
                <span className="span arrow-up">
                    <Link to={links[2][0]} className="link arrow-up" onClick={!(this.state.year === thisYear && this.state.month === thisMonth && route === "datepicker") ? (e) => this.handleClickLinkNextM(this.state.year, this.state.month, e) : this.infoMessage }>{links[2][1]}</Link>
                </span>
                <span className="span arrow-down">
                    <Link to={links[3][0]} className="link arrow-down" onClick={(e) => this.handleClickLinkPrevM(this.state.year, this.state.month, e)}>{links[3][1]}</Link>
                </span>
            </div>
        )
    } else {
        return (
            <div className='calendar-ctrl'>
                <h3 className='year'>{this.state.year} </h3>
                <div className="tooltip">
                <span className="tooltip-text">To fast-forward, keep mouse button pressed, to stop, release button.</span>
                <span className="span arrow-up" ref={this.spanYNext} onMouseDown={!this.state.timerIsOn ? (e) => this.handleNextYear(e) : this.infoMessage} onTouchStart={!this.state.timerIsOn ? (e) => this.handleNextYear(e) : this.infoMessage} onMouseUp={this.clearPressureTimer} onTouchEnd={this.clearPressureTimer} onClick={this.handleClickSpan}>
                    <Link to={links[0][0]} ref={this.JSXLinkYNext} className="link arrow-up"  onMouseUp={this.clearPressureTimer} onClick={(e) => { console.log("A click event on arrow-up"); e.preventDefault()}}>{links[0][1]}</Link>
                </span>
                <span className="span arrow-down" ref={this.spanYPrev} onMouseDown={!this.state.timerIsOn ? (e) => this.handlePreviousYear(e) : this.infoMessage} onMouseUp={this.clearPressureTimer} onTouchStart={!this.state.timerIsOn ? (e) => this.handlePreviousYear(e) : this.infoMessage} onTouchEnd={this.clearPressureTimer} onClick={this.handleClickSpan}>
                    <Link ref={this.JSXLinkYPrev} className="link arrow-down" to={links[1][0]} onMouseUp={this.clearPressureTimer} onClick={(e) => { console.log("A click event on arrow-down"); e.preventDefault()}}>{links[1][1]}</Link>
                </span>
            </div>
            <h3 className='month'>{months[this.state.month][0]}</h3>
            <span className="span arrow-up">
                <Link to={links[2][0]} className="link arrow-up" onClick={!(this.state.year === thisYear && this.state.month === thisMonth && route === "datepicker") ? (e) => this.handleClickLinkNextM(this.state.year, this.state.month, e) : this.infoMessage }>{links[2][1]}</Link>
            </span>
            <span className="span arrow-down">
                <Link to={links[3][0]} className="link arrow-down" onClick={(e) => this.handleClickLinkPrevM(this.state.year, this.state.month, e)}>{links[3][1]}</Link>
            </span>
        </div>
        )
    }

}
}

CalendarCtrl3.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChanged: PropTypes.func
}

export default withRouter(CalendarCtrl3);
