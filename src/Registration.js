import React from 'react';

import Sidebar from './Components/Sidebar.js'
import Form2 from './Form/Form2.js';


const sidenav = [
    ["", ""],
]


class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    timeouts: [],
                    intervals:[],
                    timerIsOn: false,
                    intervalIsOn: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.getTimeoutsAndTimersFromCalendarCtrl = this.getTimeoutsAndTimersFromCalendarCtrl.bind(this);
    }

    /* This click handler is necessary to prevent the datepicker from closing when clicking outside form date input */
    handleClick(event) {
        event.preventDefault();
    }

    /* This click handler is necessary to prevent fast-forward to keep on running if mouse is move outsided span/link area before mouse-button is released */
    handleMouseUp() {
        console.log("%cInside handleMouseUp() in Registration", "color: gray; font-size: x-large");
        if (this.state.timeouts.length !== 0) {
            this.state.timeouts.forEach((element) => {
                clearTimeout(element);
            });
        }
        if (this.state.intervals.length !== 0) {
            this.state.intervals.forEach((element) => {
                clearInterval(element);
            });
        }

        this.setState({timeouts: [], intervals: []});
        this.setState({timerIsOn: false, intervalIsOn: false});
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

    mainClass = "main " + this.props.location.pathname.slice(1);
    render() {
        console.log("this.props inside registration render = ");
        console.log(this.props);

        const description = "Register now to gain benefits such as access to my large member database, free vouchers and plenty more! Be aware though, that you have to be between 0 and 125 years at the time of registration to be granted membership!";
        return (

            <main className={this.mainClass} onMouseUp={this.handleMouseUp}>
                <Sidebar sidenav={sidenav}/>
                <div className="outer-wrap outer-wrap-article">
                    <div className="inner-wrap inner-wrap-article">
                        <article className="article" onClick={this.handleClick}>
                            <h2>Registration</h2>
                            {/*<p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>*/}
                            <p className='description'>{ description }</p>
                            <Form2 getTandT={this.getTimeoutsAndTimersFromCalendarCtrl} timerIsOn={this.state.timerIsOn} intervalIsOn={this.state.intervalIsOn}/>
                        </article>
                    </div>
                </div>
            </main>
        );
    };
}

export default Registration;
