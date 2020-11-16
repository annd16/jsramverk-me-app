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
        console.log("%cInside constructor in CalendarBody: ", "color: orange; font-size: large")
        console.log("%cprops in constructor in CalendarBody: ", "color: orange; font-size: large")
        console.log(props);
        // Should only assign directly to state here (initialization)
        /*console.log("props.match.params = ");
        console.log(props.match.params);*/
        /*state = {
        ...this.resolveStateFromProp()
    };*/
    this.state = {
        // ...this.resolveStateFromProp(),
        data: "Bertil",
        date: new Date(),
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        noOfDaysInMonth: 0,
        selectedDate: null,
        // beginObj: null,
        // endObj: null
    }

    console.log("%cthis.state in CalendarBody constructor = ", "color: orange; font-size: large");
    console.log(this.state);

    console.log(JSON.stringify(this.state.date));
    console.log(this.state.date.getFullYear());

    this.handleClickDate2 = this.handleClickDate2.bind(this);
}


// state = { ...this.resolveStateFromProp(), today: new Date() };


componentDidMountCalls = 0;
componentDidUpdateCalls = 0;

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
    console.log("%cresolveStateFromProp in CalendarBody!", "color: purple; font-size: large");
    this.resolveStateFromDate(this.props.date);
}

componentDidMount() {
    console.log("%ccomponentDidMount() - CalendarBody", "color: green; font-size: large");

    console.log("this.props = ");
    console.log(this.props);
    console.log(this.props.getSelectedDate);

    console.log("this.state = ");
    console.log(this.state);

    // if (this.props.calendarOpen !== prevProps.calendarOpen) {
    //     console.log("calendarOpen has changed");
    //     this.props.toggleCalendar();
    // }

    this.componentDidMountCalls += 1;
    console.log(this.componentDidMountCalls);


}

getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate() - CalendarBody");
    console.log("prevProps = ");
    console.log(prevProps);
    console.log("prevState = ");
    console.log(prevState);
    return null;
}

// shouldComponentUpdate(nextProps, nextState) {
//
//     // Should return false to prevent component from update
//     console.log("%cshouldComponentUpdate() - CalendarBody", "color: green; font-size: large");
//     if (nextProps.calendarOpen || nextProps.year !== this.props.year || nextProps.month !== this.props.month) {
//         console.log("calendar will be opened!!!");
//         // this.props.toggleCalendar();
//         return true;
//     } else {
//         console.log("calendar will be closed!!!");
//         return false;
//     }
//
// }

componentDidUpdate(prevProps, prevState, snapshot) {

    console.log("%ccomponentDidUpdate() - CalendarBody", "color: green; font-size: large");

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
    console.log("state date = " +  this.state.date);

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


        // var objWithYearMonthDay = this.getYearMonthDay();
        //
        // var year = objWithYearMonthDay.year;
        // var month = objWithYearMonthDay.month;
        // // var year = objWithYearMonthDay.year;
        //
        // var beginObj = defineStartDate(new Date(year, month, 1));
        // var endObj = defineEndDate(new Date(year, month, noOfDaysInMonth(year, month)));
        // console.log(this.state.year);
        // console.log(this.state.month);
        // console.log(this.state.day);
        //
        // this.setState({
        //     beginObj: beginObj,
        //     endObj: endObj
        // });
        // /*this.fetchData(this.props.data);*/
        // console.log("In if in componentDidUpdate!");
    }

    if (this.props.calendarOpen !== prevProps.calendarOpen) {
        console.log("calendarOpen has changed");
        this.props.toggleCalendar2(this.props.calendarOpen);
    }

    this.componentDidUpdateCalls += 1;
    console.log(this.componentDidUpdateCalls);

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
    // this.setState({selectedDate: dateObj})

    // Test 201112
    this.setState({selectedDate: dateObj})
}

infoMessage(dateObj) {
    alert('The date ' + getLocalDateInISOformat(dateObj) + ' is invalid.');
}

getYearMonthDay = () => {
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

    // Trying to prevent rerender in Datepicker
    // if(year !== this.state.year || month !== this.state.month || day !== this.state.day) {
    //     console.log("%cYear, month or day has changed!!!", "color: green; font-size: large");
    //     this.setState({
    //         year: year,
    //         month: month,
    //         day: day
    //     });
    // }
    // ==>
    // Warning: Cannot update during an existing state transition (such as within `render`).
    // Render methods should be a pure function of props and state.

    return { year: year, month: month, day: day }
}


render() {
    console.log("%cInside RENDER in CalendarBody", "color: darkblue; font-size: x-large");
    console.log("this1 = ");
    console.log(this);

    console.log("this.state = ");
    console.log(this.state);

    console.log("this.props = ");           // Here has the year and month been set
    console.log(this.props);


    /*if (this.state.redirect) {
    const link = "/calendar/" + year + "/" + month + "/" + day;
    return <Router><Redirect to={link}/></Router>
}*/

// console.log(this.state.year);
// console.log(this.state.month);
// console.log(this.state.day);
// console.log(typeof(this.state.year));
//
// console.log("this.state.data in CalendarBody render= " + this.state.data);
// console.log("this.state.date in CalendarBody render= " + JSON.stringify(this.state.date));
//
// var year, month, day;
// console.log(this.state.year);
// console.log(this.state.month);
// console.log(this.state.day);
// if (this.state.year !== "" && !isNaN(this.state.year)) {
//     year = this.state.year;
//     console.log("year1 = " + year);         // Calendar route
//     console.log(typeof(year));
// } else {
//     const dateObj = new Date();
//     year = dateObj.getFullYear();
//     console.log("year3 = " + year);
// }
// if (this.state.month !== "" && !isNaN(this.state.month)) {
//     month = this.state.month;
//     console.log("month1 = " + month);       // Calendar route
// } else {
//     const dateObj = new Date();
//     month = dateObj.getMonth();
//     console.log("month3 = " + month);
// }
// if (this.state.day !== "") {
//     day = this.state.day;
// } else {
//     /*day = parseInt(this.props.match.params.day);*/
//     const dateObj = new Date();
//     day = dateObj.getDate();
//     console.log("day = " + day);
// }

var objWithYearMonthDay = this.getYearMonthDay();

var year = objWithYearMonthDay.year;
var month = objWithYearMonthDay.month;

// Testar att använda props istället...
// var year = this.props.year;

console.log("%c year in render = ", "color: green; font-size: large");
console.log(year);      // 2020

// var month =  this.props.month;

console.log("%c month in render = ", "color: green; font-size: large");
console.log(month);     // 11

// var year = objWithYearMonthDay.year;

var beginObj = defineStartDate(new Date(year, month, 1));
var endObj = defineEndDate(new Date(year, month, noOfDaysInMonth(year, month)));

console.log("beginObj = ");
console.log(beginObj);

console.log("endObj = ");
console.log(endObj);

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

        // console.log("%c i = ", "color: green; font-size: large");
        // console.log(i);
        //
        // console.log("week = ");
        // console.log(week);      /* The correct dates */
        // console.log("%cthat2 = ", "color: green");
        // console.log(that);

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

            console.log("dateObj = ");
            console.log(dateObj);
            /*console.log("typeof(day) = " + typeof(day));
            console.log("day.getDate() = " + day.getDate());
            console.log("item[j] = ");
            console.log(item[j]);*/
            const monthNo = dateObj.getMonth();
            /*console.log("day.getMonth() = " + day.getMonth());
            console.log("thisMonth = " + thisMonth);*/
            /*console.log("monthNo = " + typeof(monthNo));
            console.log("month = " + typeof(month));*/
            // var myClass = "td day " + (monthNo === month && !checkIfDateInFuture(dateObj) ? weekdays[dateObj.getDay()][0] : "different");
            var route = that.props.route;
            var myClass = "td day " + (monthNo === month && !checkIfDateInFuture(dateObj) || route === "calendar" ? weekdays[dateObj.getDay()][0] : "different");
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
