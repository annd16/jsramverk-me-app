// Get current year, month, day and weekday with JavaScript

// Create a date object
const today = new Date();
console.log("%ctoday = ", "color: purple; font-size: x-large;");
console.log(today);         // Local time


export const thisYear = today.getFullYear();
export const thisMonth = today.getMonth();          /* 0-11 */
export const thisDay = today.getDate();             /* 1-31 */
export const thisWeekday = today.getDay();          /* 0-6 */

export const weekdays = [
    ["Sun", "Sunday"],
    ["Mon", "Monday"],
    ["Tue", "Tuesday"],
    ["Wed", "Wednesday"],
    ["Thu", "Thursday"],
    ["Fri", "Friday"],
    ["Sat", "Saturday"],
]

export const months = [
    ["Jan", "January"],
    ["Feb", "February"],
    ["Mar", "March"],
    ["Apr", "April"],
    ["May", "May"],
    ["Jun", "June"],
    ["Jul", "July"],
    ["Aug", "August"],
    ["Sep", "September"],
    ["Oct", "October"],
    ["Nov", "November"],
    ["Dec", "December"],
]

/**
* Check if valid age.
*
* @param {number} year - given year
* @param {number} month - given month
* @param {number} ageMin - minimum age
* @param {number} ageMax - maximum age
*
* @returns {boolean}.
*/
export function checkIfValidAge(year, month, ageMin, ageMax) {
    /* month - a value between 0 and 11 */
    const prevDate = new Date(year, month-1, 1);
    const prevYear = prevDate.getFullYear();
    /*const prevMonth = prevDate.getMonth()+1;*/
    const prevMonth = prevDate.getMonth();
    return { prevYear: prevYear, prevMonth: prevMonth }
}

/**
* Check if given date is within valid range.
*
* @param {object} dateObj - the date.
*
* @returns {boolean}.
*/
export function checkIfDateInValidRange(dateObj, maxAge, minAge=0) {
    var today = new Date();

    console.log("%cmaxAge: ", "color: pink; font-size: x-large");
    console.log(maxAge);
    console.log("%cminAge: ", "color: pink; font-size: x-large");
    console.log(minAge);

    const timeEarliest = today.getTime()-maxAge*(24*60*60*1000*365);
    const timeLatest = today.getTime()-minAge*(24*60*60*1000*365);

    console.log("%cdateObj.getTime(): ", "color: pink; font-size: x-large");
    console.log(dateObj.getTime());
    console.log("%ctimeEarliest: ", "color: pink; font-size: x-large");
    console.log(timeEarliest);
    console.log("%ctimeLatest: ", "color: pink; font-size: x-large");
    console.log(timeLatest);


    if(dateObj.getTime() > timeEarliest && dateObj.getTime() < timeLatest ) {
        return true;
    } else {
        return false;
    }
}


/**
* Gets the year and month before the given year and month.
*
* @param {number} year - given year
* @param {number} month - given month
*
* @returns {object}.
*/
export function getPreviousMonth(year, month) {
    /* month - a value between 0 and 11 */
    const prevDate = new Date(year, month-1, 1);
    const prevYear = prevDate.getFullYear();
    /*const prevMonth = prevDate.getMonth()+1;*/
    const prevMonth = prevDate.getMonth();
    return { prevYear: prevYear, prevMonth: prevMonth }
}

/**
* Gets the year and month before the given year and month.
*
* @param {number} year - given year
* @param {number} month - given month
*
* @returns {object}.
*/
export function getPreviousYear(year, month) {
    /* month - a value between 0 and 11 */
    const prevDate = new Date(year-1, month, 1);
    const prevYear = prevDate.getFullYear();
    /*const prevMonth = prevDate.getMonth()+1;*/
    const prevMonth = prevDate.getMonth();
    return { prevYear: prevYear, prevMonth: prevMonth }
}


/**
* Gets the year and month after the given year and month.
*
* @param {number} year - given year
* @param {number} month - given month
*
* @returns {object}
*/
export function getNextMonth(year, month) {
    /* month - a value between 0 and 11 */
    const nextDate = new Date(year, month+1, 1);
    const nextYear = nextDate.getFullYear();
    /*const nextMonth = nextDate.getMonth()+1;*/
    const nextMonth = nextDate.getMonth();
    return { nextYear: nextYear, nextMonth: nextMonth }
}

/**
* Gets the year and month after the given year and month.
*
* @param {number} year - given year
* @param {number} month - given month
*
* @returns {object}.
*/
export function getNextYear(year, month) {
    /* month - a value between 0 and 11 */
    const nextDate = new Date(year+1, month, 1);
    const nextYear = nextDate.getFullYear();
    /*const nextMonth = nextDate.getMonth()+1;*/
    const nextMonth = nextDate.getMonth();
    return { nextYear: nextYear, nextMonth: nextMonth }
}

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = date => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());

    return isDate && isValidDate;
}

/**
* Pads numbers below 10 with a zero.
*
* @param {number} number - the number that is going to be checked and padded if < 10
*
* @returns {number}.
*/
function zeroPad(number)
{
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}


/**
* Converts a date object to a date string in simplified extended ISO format (ISO 8601).
*
* @param {object} date - the date to convert
*
* @returns {string}.
*/
export const getLocalDateInISOformat = (date = new Date()) => {
    // If not valid date return null
    if(!isDate(date)) return null;

    return [
        date.getFullYear(),
        zeroPad(date.getMonth()+1),
        zeroPad(date.getDate()),
    ].join("-");
}


/**
* Creates a valid date object from a given year, month number (0-11) and day.
*
* @param {number} year - given year
* @param {number} month - month number (0-11) for given month
* @param {number} day - given day
*
* @returns {object}.
*/
export function createValidDateobject(year, month, day) {

    const dateObj = new Date(year, month, day);

    const year1 = dateObj.getFullYear();
    const month1 = dateObj.getMonth()+1;
    const day1 = dateObj.getDate();

    console.log("day = " +  day);
    console.log("month = " +  month1);
    console.log("day = " +  day1);

    return dateObj;

}

/**
* Checks if given year is a leap year ('skottår' in swedish).
*
* @param {number} year - the number that is going to be checked and padded if < 10
*
* @returns {boolean}.
*/
function isLeapYear(year) {
    if (year % 4 === 0) {
        if ((year % 100 !== 0 ) || (year % 400 === 0)) {
            console.log("Leap year!");
            return true;
        }
    }
    console.log("NOT a Leap year!");
    return false;
}


/**
* Calculates the week number for a specific day.
* Code borrowed from:
* https://www.codeproject.com/Articles/4044/Javascript-to-find-the-weeknumber-Gregorian-Calend
*
* @param {number} year - the year.
* @param {number} month - the month.
* @param {number} day - the day in month.
*
* @returns {number}.
*/
export function getWeekNumber(year, month, day) {
    // Find JulianDay
    month += 1; // Use 1-12
    var a = Math.floor((14-(month))/12);
    var y = year+4800-a;
    var m = (month)+(12*a)-3;
    var jd = day + Math.floor(((153*m)+2)/5) +
    (365*y) + Math.floor(y/4) - Math.floor(y/100) +
    Math.floor(y/400) - 32045;      // (gregorian calendar)
    // var jd = (day+1)+Math.Round(((153*m)+2)/5)+(365+y) +
    //                 Math.round(y/4)-32083;    // (julian calendar)

    // Calc weeknumber according to JD
    var d4 = (jd+31741-(jd%7))%146097%36524%1461;
    var L = Math.floor(d4/1460);
    var d1 = ((d4-L)%365)+L;
    const NumberOfWeek = Math.floor(d1/7) + 1;
    return NumberOfWeek;
}

/**
* Gets the number of days for a given month (in a given year).
*
* @param {number} year - the year.
* @param {number} month - the month.
*
* @returns {number}.
*/
export const noOfDaysInMonth = function(year, month) {
    const monthsWith30Days = [3, 5, 8, 10];
    if (monthsWith30Days.includes(month)) {
        return 30;
    }
    else if (month === 1) {
        if (isLeapYear(year)) {
            return 29;
        } else {
            return 28;
        }
    }
    return 31;
}


export function getFirstDayNumber(month = thisMonth, year = thisYear) {

    var begin = new Date(year, month, 1);
    return begin.getDay() + 1;
}

/**
* Gets the first day of Calendar view for a given date (month/year).
*
* @param {object} dateObj - the date.
*
* @returns {object}.
*/
export function defineStartDate(dateObj = new Date()) {

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();

    var begin = new Date(year, month, 1);

    console.log("begin = " + begin);

    console.log("weekdays[begin.getDay()] = " + weekdays[begin.getDay()]);
    console.log("weekdays[begin.getDay()][0] = " + weekdays[begin.getDay()][0]);
    /*var startDay = weekdays[begin.getDay()][0];*/

    // Pad with "dummy-days" if the first day of month is not a Monday
    var i = 1;
    while (begin.getDay() !== 1) {
        /*begin = new Date(Date.now() - 86400000*i);*/
        console.log("i = " + i);
        console.log("begin.getDay() = " + begin.getDay());
        begin = new Date(begin.getTime() - 86400000);
        console.log("begin = " + begin);
        if (i >= 10) {
            break;
        }
        i++;
    }
    console.log("%cbegin = ", "color: pink; font-size: x-large");
    console.log(begin);
    console.log("weekdays[begin.getDay()][0] = " + weekdays[begin.getDay()][0]);
    return begin;
}

/**
* Gets the last day of Calendar view for a given date (month/year).
*
* @param {object} dateObj - the date.
*
* @returns {object}.
*/
export function defineEndDate(dateObj = new Date()) {

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();

    var end = new Date(year, month, noOfDaysInMonth(year, month));

    /*console.log("end = " + end);

    console.log("weekdays[end.getDay()] = " + weekdays[end.getDay()]);
    console.log("weekdays[end.getDay()][0] = " + weekdays[end.getDay()][0]);
    var endDay = weekdays[end.getDay()][0];*/

    // Pad with "dummy-days" if the last day of month is not a Sunday
    var i = 1;
    while (end.getDay() !== 0) {
        /*console.log("i = " + i);
        console.log("end.getDay() = " + end.getDay());
        end = new Date(end.getTime() + 86400000);
        console.log("end = " + end);*/
        if (i >= 10) {
            break;
        }
        i++;
    }
    console.log("%cend = ", "color: pink; font-size: x-large");
    console.log(end);
    console.log("weekdays[end.getDay()][0] = " + weekdays[end.getDay()][0]);
    return end;
}

/**
* Calculates the number of weeks in Calendar view between two dates.
*
* @param {object} beginObj - the start date.
* @param {object} endObj - the end date.
*
* @returns {object}.
*/
function noOfWeeksInCalendarView(beginObj, endObj) {
    var timeStart = beginObj.getTime();
    var timeEnd = endObj.getTime();

    var noOfWeeks = (timeEnd-timeStart+86400000)/(86400000*7);
    console.log("noOfWeeks = " + noOfWeeks);
    return noOfWeeks;
}

/**
* Creates all date objects in Calendar view, stores them in an array and returns this array.
*
* @param {object} beginObj - the start date.
* @param {object} endObj - the end date.
*
* @returns {array}.
*/
/*export const weeksInCalendarView = function(beginObj, endObj, monthName, year, month, day) {*/
export const weeksInCalendarView = function(beginObj, endObj) {
    var weeksInCalendarViewArray = [];

    var year = beginObj.getFullYear();
    /*console.log("year = " + year);*/
    var month = beginObj.getMonth();
    /*console.log("month = " + month);*/
    var day = beginObj.getDate();
    /*console.log("day in month = " + day);*/

    const noOfWeeks = noOfWeeksInCalendarView(beginObj, endObj);
    console.log("%cnoOfWeeks = ", "color: cyan; font-size: x-large");
    console.log(noOfWeeks);
    /*var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);*/
    console.log("weeksInCalendarViewArray = " + weeksInCalendarViewArray)
    /*for (const [index, value] of noWeeksInCalendarView.entries()) {*/
    for (var i = 0; i < Math.ceil(noOfWeeks); i++) {
        var aWeekInCalendarView = [];
        for (var j = i*7; j < 7+i*7; j++) {
            const aDay = new Date(year, month, day);
            aDay.setDate(aDay.getDate() + j);
            aWeekInCalendarView[j-i*7] = aDay;
            /*console.log(aDay);*/
        }
        weeksInCalendarViewArray[i] = aWeekInCalendarView;
    }

    console.log(weeksInCalendarViewArray);
    return weeksInCalendarViewArray;
}

/**
* Check if given date is today, if so append ' today' to classname.
*
* @param {object} dateObj - the date.
* @param {string} myClass - the class.
*
* @returns {string}.
*/
export function checkIfTodaySetClass(dateObj, myClass)
{
    /*console.log("checkIfTodaySetClass()");
    console.log("dateObj.getDate() = " + dateObj.getDate());
    console.log("dateObj.getMonth() = " + dateObj.getMonth());
    console.log("dateObj.getFullYear() = " + dateObj.getFullYear());
    console.log("thisDay = " + thisDay);
    console.log("thisMonth = " + thisMonth);
    console.log("thisYear = " + thisYear);*/

    if ((dateObj.getDate() === thisDay) && (dateObj.getMonth() === thisMonth) && (dateObj.getFullYear() === thisYear) && (myClass !== 'different')) {
        myClass += ' today';
        console.log("TODAY!");
    }
    return myClass;
}

/**
* Check if given date is a future date.
*
* @param {object} dateObj - the date.
*
* @returns {boolean}.
*/
export function checkIfDateInFuture(dateObj) {
    if(dateObj.getTime() > today.getTime()) {
        return true;
    } else {
        return false;
    }
}
