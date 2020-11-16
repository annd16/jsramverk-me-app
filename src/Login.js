import React from 'react';

import { withRouter } from 'react-router-dom';

import Sidebar from './Components/Sidebar.js';
import Form from './Form/Form_logout.js';
import Form2 from './Form/Form_login.js';

import ShowLocationAndHistory from './Components/ShowLocationAndHistory.js';



const sidenav = [
    ["", ""],
]


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    timeouts: [],
                    intervals:[],
                    timerIsOn: false,
                    intervalIsOn: false,
                    // token: '',
                    // userLoggedIn: false,
                    // sendStatusToParent: this.props.sendStatusToParent,
                    // sendTokenToParent:  this.props.sendTokenToParent
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        // this.sendDataToParent = this.sendDataToParent.bind(this);
        // this.getJWTFromLoginForm = this.getJWTFromLoginForm.bind(this);
        // this.getUserLoggedIn = this.getUserLoggedIn.bind(this);

        this.updateParent = this.updateParent.bind(this);

        this.updateLoginFormData = this.updateLoginFormData.bind(this);

        // this.getTimeoutsAndTimersFromCalendarCtrl = this.getTimeoutsAndTimersFromCalendarCtrl.bind(this);
    }


    // componentDidMount() {
    //     console.log("componentDidMount - Login!!");
    //     // this.getData();
    //     // console.log(this.state.previous);
    //     // console.log(this.state.data);
    //     console.log("this.state = ");
    //     console.log(this.state);
    //     console.log("this.props = ");
    //     console.log(this.props);
    //     console.log("this.props.location = ");
    //     console.log(this.props.location);
    //     var status;
    //     var token;
    //     // this.getJWTFromLoginForm(status);
    //     // this.getUserLoggedIn(token);
    //     // this.sendStatusToParent(this.state.userLoggedIn);
    //     // this.sendTokenToParent(this.state.token);
    //     /* Layout will be rerendered after setState() has been called */
    // }


    // componentDidUpdate() {
    //     console.log("componentDidUpdate - Login!!");
    //     // this.getData();
    //     // console.log(this.state.previous);
    //     // console.log(this.state.data);
    //     console.log("this.state = ");
    //     console.log(this.state);
    //     console.log("this.props = ");
    //     console.log(this.props);
    //     var status;
    //     var token;
    //     // this.getJWTFromLoginForm(status);
    //     // this.getUserLoggedIn(token);
    //     // this.props.sendStatusToParent(this.state.userLoggedIn);
    //     // this.props.sendTokenToParent(this.state.token);
    //     /* Layout will be rerendered after setState() has been called */
    // }


    componentDidMount() {
        console.log("componentDidMount - Login!!");
        console.log("this.state = ");
        console.log(this.state);
        console.log("this.props = ");
        console.log(this.props);
        console.log("this.props.location = ");
        console.log(this.props.location);

        this.props.updateLayoutWithLocations(this.props.location);

    }

    componentDidUpdate(prevProps) {
            console.log("componentDidUpdate - Login!!");
            console.log("this.state = ");
            console.log(this.state);
            console.log("this.props = ");
            console.log(this.props);

            // prevProps is the props BEFORE update
            if (prevProps.location.pathname !== this.props.location.pathname) {
                console.log("Location has been changed in Login componentDidUpdate()");
            }

            if (prevProps.prevLocation.pathname !== this.props.prevLocation.pathname) {
                console.log("prevLocation has been changed in Login componentDidUpdate()");
            }
    }

    /* This click handler is necessary to prevent the datepicker from closing when clicking outside form date input */
    handleClick(event) {
        event.preventDefault();
    }

    /* This click handler is necessary to prevent fast-forward to keep on running if mouse is move outsided span/link area before mouse-button is released */
    handleMouseUp() {
        console.log("%cInside handleMouseUp() in Login", "color: gray; font-size: x-large");
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


    // getTimeoutsAndTimersFromCalendarCtrl(timeouts, intervals) {
    //
    //     console.log("%ctimeouts = ", "color: gray; font-size: x-large");
    //     console.log(timeouts);
    //     console.log("%cintervals = ", "color: grey; font-size: x-large");
    //     console.log(intervals);
    //
    //     this.setState({
    //         timeouts: timeouts,
    //         intervals: intervals,
    //     });
    // }

    // sendDataToParent() {
    //     this.props.sendTokenToParent(this.state.token);
    //     this.props.sendStatusToParent(this.state.userLoggedIn);
    // }


    // getJWTFromLoginForm(token) {
    //
    //     console.log("%ctoken = ", "color: gray; font-size: x-large");
    //     console.log(token);
    //
    //     this.setState({
    //         token: token
    //     });
    //     // this.props.sendStatusToParent(this.state.userLoggedIn);
    //     // this.props.sendTokenToParent(this.state.token);
    //     return token;
    // }
    //
    //
    // getUserLoggedIn(status) {
    //     console.log("%cstatus = ", "color: gray; font-size: x-large");
    //     console.log(status);
    //
    //     this.setState({
    //         userLoggedIn: status
    //     });
    //     // this.props.sendStatusToParent(this.state.userLoggedIn);
    //     // this.props.sendTokenToParent(loggedInUser.token);
    //     return status;
    // }

    updateLoginFormData(isSubmitted) {
        console.log("Inside updateRegistrationFormData()!!");
        console.log("%cisSubitted = ", "color: gray; font-size: x-large");
        console.log(isSubmitted);

        this.setState({
            formIsSubmitted: isSubmitted
        });
    }

    updateParent(user, status, token) {
        this.props.updateGrandparent(user, status, token);
    }

    mainClass = "main " + this.props.location.pathname.slice(1);
    render() {
        // this.state.sendStatusToParent(this.state.userLoggedIn);
        // this.state.sendTokenToParent(this.state.token);
        // this.sendDataToParent();
        // this.props.sendStatusToParent(this.state.userLoggedIn);
        // this.props.sendTokenToParent(this.state.token);
        console.log("this.props inside login render = ");
        console.log(this.props);
        console.log("this.state inside login render = ");
        console.log(this.state);
        const description = "Please login with your e-mail address and password.";
        const description2 = "You are now successfully logged in!";
        // if (this.props.status) {
        //     return (
        //         <main className={this.mainClass} onMouseUp={this.handleMouseUp}>
        //             <Sidebar sidenav={sidenav}/>
        //             <div className="outer-wrap outer-wrap-article">
        //                 <ShowLocationAndHistory/>
        //                 <div className="inner-wrap inner-wrap-article">
        //                     <article className="article" onClick={this.handleClick}>
        //                         <h2>Logout-view in Login</h2>
        //                         {/*<p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>*/}
        //                         <div> {"Status = " + this.props.status}</div>
        //                         <p className='description'>{ description2 }</p>
        //                         {/*<Form2 sendTokenToParent={this.getJWTFromLoginForm} sendStatusToParent={this.getUserLoggedIn}/>*/}
        //                         <Form updateParent={this.updateParent} user={this.state.user} status={this.props.status} token={this.props.token}/>
        //                         {/*<Form2 sendTokenToParent={this.props.sendTokenToParent} sendStatusToParent={this.props.sendStatusToParent}/>*/}
        //                     </article>
        //                 </div>
        //             </div>
        //         </main>
        //     );
        // } else {
            return (
                <main className={this.mainClass} onMouseUp={this.handleMouseUp}>
                    <Sidebar sidenav={sidenav}/>
                    <div className="outer-wrap outer-wrap-article">
                        <ShowLocationAndHistory/>
                        <div className="inner-wrap inner-wrap-article">
                            <article className="article" onClick={this.handleClick}>
                                    <h2>Login</h2>
                                {/*<p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>*/}
                                <p className='description'>{ description }</p>
                                {/*<Form2 sendTokenToParent={this.getJWTFromLoginForm} sendStatusToParent={this.getUserLoggedIn}/>*/}
                                <Form2 updateParent={this.updateParent} status={this.props.status} token={this.props.token} history={this.props.history} location={this.props.location} goBack={this.props.goBack -1} location={this.props.location} prevLocation={this.props.prevLocation} updateLoginFormData={this.updateLoginFormData}/>
                                {/*<Form2 sendTokenToParent={this.props.sendTokenToParent} sendStatusToParent={this.props.sendStatusToParent}/>*/}
                            </article>
                        </div>
                    </div>
                </main>
            );
        }

    };
// }

export default withRouter(Login);
