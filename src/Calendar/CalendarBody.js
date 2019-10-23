import React from 'react';
import { withRouter } from 'react-router-dom';

/*import { thisYear, thisMonth, thisDay, thisWeekday } from './functions.js';*/
import { weekdays } from './functions.js';
import { noOfDaysInMonth } from './functions.js';
import { weeksInCalendarView } from './functions.js';
import { getWeekNumber, checkIfTodaySetClass, defineStartDate, defineEndDate, isDate, checkIfDateInFuture, checkIfDateInValidRange, getLocalDateInISOformat } from './functions.js';
/*import functions from './functions.js';     /* the default export from functions */

import PropTypes from 'prop-types';


function isSameDay(date1, date2) {
    return date1.getTime() === date2.getTime();
}

const WeekHeader = () => {
    return <div className="thead">
    <ul className="tr">
    <li className="th weeknumber">week</li>
    {weekdays.map(function(item, i) {
        if (item[0] !== "Sun") {
            return <li key={item} className="th w-header" ><abbr title={item[0].charAt(0)}>{item[0]}</abbr></li>
        }
        return null;
    })}
    <li className="th w-header" ><abbr title={weekdays[0][0].charAt(0)}>{weekdays[0][0]}</abbr></li>
    </ul>
    </div>
}

class CalendarBody extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in CalendarBody: ", "color: orange; font-size: large")
        console.log(props);
        // Should only assign directly to state here (initialization)
        /*console.log("props.match.params = ");
        console.log(props.match.params);*/
        /*state = {
        ...this.resolveStateFromProp()
        };*/
        this.state = {
            ...this.resolveStateFromProps(),
            data: "Bertil",
            year: "",
            month: "",
            day: "",
            date: new Date(),
            noOfDaysInMonth: 0,
            selectedDate: null,
        }

        console.log("%cthis.state in CalendarBody = ", "color: orange; font-size: large");
        console.log(this.state);

        console.log(JSON.stringify(this.state.date));
        console.log(this.state.date.getFullYear());

        this.handleClickDate2 = this.handleClickDate2.bind(this);
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
        console.log("componentDidMount() - CalendarBody");

        console.log("this.props = ");
        console.log(this.props);
        console.log(this.props.getSelectedDate);

        console.log("this.state = ");
        console.log(this.state);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate() - CalendarBody");
        console.log("prevProps = ");
        console.log(prevProps);
        console.log("prevState = ");
        console.log(prevState);
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log("componentDidUpdate() - CalendarBody");

        console.log("prevProps = ");
        console.log(prevProps);
        console.log("prevState = ");
        console.log(prevState);
        console.log("snapshot = ");
        console.log(snapshot);
        console.log("this.props = ");
        console.log(this.props);
        /*console.log("this.props.match = ");
        console.log(this.props.match);*/
        console.log(this.props.data);
        console.log(this.state.data);  // Göran
        console.log(prevProps.data);

        console.log(JSON.stringify(this.props.date));
        /*const year = this.props.date.getFullYear();
        const month = this.props.date.getMonth()+1;
        const day = this.props.date.getDate();

        console.log("year = " +  year);
        console.log("month = " +  month);
        console.log("day = " +  day);

        /*const dateObj = createValidDateobject(year1, month1, day1);*/

        /*const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const day = dateObj.getDate();*/

        console.log("state year = " +  this.state.year);
        console.log("state month = " +  this.state.month);
        console.log("state day = " +  this.state.date);

        /* if (parseInt(year) > 0 && 0 <= parseInt(month) <= 11 &&  0 < parseInt(day) <= noOfDaysInMonth ) {*/
        // Typical usage (don't forget to compare props):

        if ((this.props.year !== prevProps.year) || (this.props.month !== prevProps.month)) {
            this.setState({
                data: "Astrid",
                year: this.props.year,
                month: this.props.month,
                day: this.props.day,
                date: this.props.date,
                noOfDaysInMonth: noOfDaysInMonth(this.props.year, this.props.month),
            });
            /*this.fetchData(this.props.data);*/
            console.log("In if in componentDidUpdate!");
        }


        /*}*/
    }

    handleClickDate2(year, month, event) {
        /* Necessarry to prevent datepicker from closing after this method has been called */
        event.preventDefault();
        /*alert('The date was clicked.');*/
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
        console.log("%cdateObj inside handleClickDate2() = ", "color: green; font-size: x-large");
        console.log(dateObj);
        console.log("%cthis.props = ");
        console.log(this.props);
        this.props.getSelectedDate(dateObj);
        this.setState({selectedDate: dateObj})
    }

    infoMessage(dateObj) {
        alert('The date ' + getLocalDateInISOformat(dateObj) + ' is invalid.');
    }

    render() {
        console.log("%cInside render in CalendarBody", "color: darkblue; font-size: x-large");
        console.log("this1 = ");
        console.log(this);

        /*if (this.state.redirect) {
        const link = "/calendar/" + year + "/" + month + "/" + day;
        return <Router><Redirect to={link}/></Router>
    }*/

    console.log(this.state.year);
    console.log(this.state.month);
    console.log(this.state.day);
    console.log(typeof(this.state.year));

    console.log("this.state.data in CalendarBody render= " + this.state.data);
    console.log("this.state.date in CalendarBody render= " + JSON.stringify(this.state.date));

    var year, month, day;
    console.log(this.state.year);
    console.log(this.state.month);
    console.log(this.state.day);
    if (this.state.year !== "" && !isNaN(this.state.year)) {
        year = this.state.year;
        console.log("year1 = " + year);         // Calendar route
        console.log(typeof(year));
    } else {
        const dateObj = new Date();
        year = dateObj.getFullYear();
        console.log("year3 = " + year);
    }
    if (this.state.month !== "" && !isNaN(this.state.month)) {
        month = this.state.month;
        console.log("month1 = " + month);       // Calendar route
    } else {
        const dateObj = new Date();
        month = dateObj.getMonth();
        console.log("month3 = " + month);
    }
    if (this.state.day !== "") {
        day = this.state.day;
    } else {
        /*day = parseInt(this.props.match.params.day);*/
        const dateObj = new Date();
        day = dateObj.getDate();
        console.log("day = " + day);
    }
    var beginObj = defineStartDate(new Date(year, month, 1));
    var endObj = defineEndDate(new Date(year, month, noOfDaysInMonth(year, month)));
    console.log(this.state.year);
    console.log(this.state.month);
    console.log(this.state.day);
    /*console.log(this.props.match.params.year);
    console.log(this.props.match.params.month);
    console.log(this.props.match.params.day);*/
    var that = this;
    return (
        <div className="calendar-body">
        <div className='month'>
        <WeekHeader/>
        {/*<span className="info"> Number of days:{ noOfDaysInMonth(year, month) } </span>
        <div className="info"> this.props.year :{ this.props.year } </div>
        <div className="info"> this.props.month :{ this.props.month } </div>
        <div className="info"> this.state.year :{ this.state.year } </div>
        <div className="info"> this.state.month :{ this.state.month } </div>
        <div className="info"> this.props.date :{ JSON.stringify(this.props.date) } </div>
        <div className="info"> this.state.date :{ JSON.stringify(this.state.date) } </div>
        <div className="info"> this.state.data :{ this.state.data } </div>*/}
        {/*<span>{ noWeeksInCalendarView }</span>*/}

        <div className="tbody">
        {weeksInCalendarView(beginObj, endObj).map(function(week, i) {

            console.log("%c i = ", "color: green; font-size: large");
            console.log(i);

            console.log("week = ");
            console.log(week);      /* The correct dates */
            console.log("this2 = " + this);
            console.log("%cthat2 = ", "color: green");
            console.log(that);

            var year0, month0, day0, year3, month3, day3, year6, month6, day6;
            /*console.log("%cweek[0].getFullYear() = ", "color: green; font-size: large");
            console.log("First day of week!");
            console.log(week[0].getFullYear());*/
            year0 = week[0].getFullYear();

            /*console.log("week[0].getMonth() = ");
            console.log(week[0].getMonth());*/
            month0 = week[0].getMonth();

            /*console.log("week[0].getDate() = ");
            console.log(week[0].getDate());*/
            day0 = week[0].getDate();


            /*console.log("%cweek[3].getFullYear() = ", "color: green; font-size: large");
            console.log("Mid day of week!");
            console.log(week[3].getFullYear());*/
            year3 = week[3].getFullYear();

            /*console.log("week[3].getMonth() = ");
            console.log(week[3].getMonth());*/
            month3 = week[3].getMonth();

            /*console.log("week[3].getDate() = ");
            console.log(week[3].getDate());*/
            day3 = week[3].getDate();



            /*console.log("%cweek[6].getFullYear() = ", "color: green; font-size: large");
            console.log("Last day of week!");
            console.log(week[6].getFullYear());*/
            year6 = week[6].getFullYear();

            /*console.log("week[6].getMonth() = ");
            console.log(week[6].getMonth());*/
            month6 = week[6].getMonth();

            /*console.log("week[6].getDate() = ");
            console.log(week[6].getDate());*/
            day6 = week[6].getDate();

            console.log("year0 = " + year0 + "month0 = " + month0 + "day0 = " + day0);
            console.log("year3 = " + year3 + "month3 = " + month3 + "day3 = " + day3);
            console.log("year6 = " + year6 + "month6 = " + month6 + "day6 = " + day6);

            return <ul className="tr" key={getWeekNumber(year, month0, day0)}><li className="td weeknumber">{getWeekNumber(year, month0, day0)}</li>{week.map(function(dateObj, j) {
                /*console.log("this3 = " + this);
                console.log("%cthat3 = ", "color: green");
                console.log(that);*/
                if (that.state.selectedDate) {
                    console.log("%cthat.state.selectedDate in CalendarBody render = ", "color: brown; font-size: x-large");
                    console.log(that.state.selectedDate);
                }
                /*console.log("typeof(day) = " + typeof(day));
                console.log("day.getDate() = " + day.getDate());
                console.log("item[j] = ");
                console.log(item[j]);*/
                const monthNo = dateObj.getMonth();
                /*console.log("day.getMonth() = " + day.getMonth());
                console.log("thisMonth = " + thisMonth);*/
                /*console.log("monthNo = " + typeof(monthNo));
                console.log("month = " + typeof(month));*/
                var myClass = "td day " + (monthNo === month && !checkIfDateInFuture(dateObj) ? weekdays[dateObj.getDay()][0] : "different");
                myClass = checkIfTodaySetClass(dateObj, myClass);
                myClass += (that.state.selectedDate && that.state.selectedDate.getTime() === dateObj.getTime()) ? " selected" : "";
                return (<li key={j} className={myClass} onClick={checkIfDateInValidRange(dateObj, 125, 0) ? (e) => that.handleClickDate2(year, monthNo, e) : (e) => that.infoMessage(dateObj, e)}>{dateObj.getDate()}</li>);
            })}</ul>
        })}
        </div>

        </div>
        </div>
    )
    }
}

CalendarBody.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChanged: PropTypes.func
}

export default withRouter(CalendarBody);
