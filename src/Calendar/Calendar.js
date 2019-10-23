import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { weekdays, months } from './functions.js';
import { noOfDaysInMonth } from './functions.js';
import { weeksInCalendarView } from './functions.js';
import { createValidDateobject, getWeekNumber, checkIfTodaySetClass, defineStartDate, defineEndDate, isDate, getLocalDateInISOformat } from './functions.js';
/*import functions from './functions.js';*/
import Timer from '../Timer/Timer.js';
import Sidebar from '../Components/Sidebar.js'

import PropTypes from 'prop-types';

const sidenav = [
    ["", ""],
]


function isSameDay(date1, date2) {
    return date1.getTime() === date2.getTime();
}


const WeekHeader = () => {
    return <div className="thead"><ul className="tr"><li className="th weeknumber">week</li>
    {
        weekdays.map(function(item, i) {
            if (item[0] !== "Sun") {
                return <li key={i.toString()} className="th w-header"><abbr title={item[0].charAt(0)}>{item[0]}</abbr></li>
            }
            return null;
        })
    }
    <li className="th w-header" ><abbr title={weekdays[0][0].charAt(0)}>{weekdays[0][0]}</abbr></li></ul></div>
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        console.log("props in Calendar: ")
        console.log(props);
        // Should only assign directly to state here (on initialization)
        console.log("props.match.params = ");
        console.log(props.match.params);
        /*state = {
        ...this.resolveStateFromProp()
    };*/
    this.state = {
        ...this.resolveStateFromProps(),
        data: "Bertil",
        year: "",
        month: "",
        day: "",
        date: new Date()
    }

    this.handleClickDate = this.handleClickDate.bind(this);
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
        data: "Göran",
        year: year,
        month: month,
        day: day,
    });
    console.log("this.state = ");
    console.log(this.state);
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

    /*var year, month, day;*/
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
        <div className="inner-wrap inner-wrap-article">
        <article className="article" onClick={this.handleClick}>
        <h2>Calendar</h2>
        <div className="calendar" id="myPopup">
        <div className='month'>
        <h3 className='year'>{year} </h3><span><Link to={links[0][0]} className="link arrow-up">{links[0][1]}</Link></span><span><Link to={links[1][0]} className="link arrow-down">{links[1][1]}</Link></span>
        <h3 className='month'>{months[month][0]}</h3><span><Link to={links[2][0]} className="link arrow-up">{links[2][1]}</Link></span><span><Link to={links[3][0]} className="link arrow-down">{links[3][1]}</Link></span>
        <WeekHeader/>
        {/*}<span> { noOfDaysInMonth(year, month) } </span>*/}
        {/*<span>{ noWeeksInCalendarView }</span>*/}

        <div className="tbody">{weeksInCalendarView(beginObj, endObj).map(function(item, i) {
            console.log("item = ");
            console.log(item);
            console.log("this2 = " + this);
            console.log("%cthat2 = ", "color: green");
            console.log(that);

            const year = item[i].getFullYear();
            const month2 = item[i].getMonth();
            const dayOfMonth = item[i].getDate();

            console.log("item[i].getFullYear() = ");
            console.log(item[i].getFullYear());
            console.log("item[i].getMonth() = ");
            console.log(item[i].getMonth());
            console.log("item[i].getDate() = ");
            console.log(item[i].getDate());

            return <ul className="tr" key={getWeekNumber(year, month2, dayOfMonth)}><li className="td weeknumber">{getWeekNumber(year, month2, dayOfMonth)}</li>{item.map(function(dateObj, j) {
                console.log("this3 = " + this);
                console.log("%cthat3 = ", "color: green");
                console.log(that);
                /*console.log(day);
                console.log("typeof(day) = " + typeof(day));
                console.log("day.getDate() = " + day.getDate());
                console.log("item[j] = ");
                console.log(item[j]);*/
                const monthNo = dateObj.getMonth();
                /*console.log("day.getMonth() = " + day.getMonth());
                console.log("thisMonth = " + thisMonth);*/
                console.log("monthNo = " + typeof(monthNo));
                console.log("month = " + typeof(month));
                var myClass = "td day " + (monthNo === month ? weekdays[dateObj.getDay()][0] : "different");
                myClass = checkIfTodaySetClass(dateObj, myClass);
                return (<li key={j} className={myClass} onClick={(e) => that.handleClickDate(year, monthNo, e)}>{dateObj.getDate()}</li>);
            })}</ul>
        })
    }</div>
    </div>
    </div>
    {/*<p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>*/}
    </article>
    </div>
    </div>
    </main>
)
}
}

Calendar.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChanged: PropTypes.func
}

export default withRouter(Calendar);
