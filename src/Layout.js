import React from 'react';
import { Route, Redirect, NavLink, withRouter } from 'react-router-dom';

import Me from './Me.js';
import Reports from './Reports.js';
import Report from './Report.js';
import Http404 from './Http404.js';
import Registration from './Registration.js';
import Calendar from './Calendar/Calendar.js';
import Calendar2 from './Calendar/Calendar2.js';
import Login from './Login.js';
import Logout from './Logout.js';
import User from './User.js';
import Users from './Users.js';
import DBReports from './DBReports2.js';
import DBReport from './DBReport.js';


import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

const headerText = "Annas me-app (React)";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

const navbar = [
    ["/", "Me"],
    ["/reports", "Reports"],
    ["/registration", "Registration"],
    ["/calendar/"+ year + "/" + month + "/" + day, "Calendar"],
    ["/calendar2/"+ year + "/" + month + "/" + day, "Calendar2"],
    // ["/login", "Login"],
    ["/dbreports", "DB reports"],
    ["/users", "Users"],
    ["/user", "User"]
];


// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         fakeAuth.isAuthenticated === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };

class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in Header: ", "color: orange; font-size: large");
        console.log(props);
    }
    render() {
        return (
            <header>
            <div className="header">
            <h1>{headerText}</h1>
            {/* "history.location.pathname = " + history.location.pathname */}
            {<p className='sign'>Under construction!</p>}
            {<p className=''>{(this.props.user ? this.props.user.email: "Someone") + ' is logged in: ' + this.props.status}</p>}
            <NavLink exact to={this.props.status ? "/logout" : "/login" } activeClassName="active">{this.props.status ? "Logout" : "Login"}</NavLink>
            </div>
            </header>
        )
    }
}

class Navbar extends React.Component {
    render() {
        return (
            <div className="nav">
            <nav>
            <ul>
            {navbar.map(function(item, i) {
                const navbarItem =
                <li className="nav-item" key={i}>
                <NavLink exact to={item[0]} activeClassName="active">{item[1]}</NavLink>
                </li>;
                return navbarItem;
            })}
            </ul>
            </nav>
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
            <div className="footer-item">
            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
            </div>
            <div className="footer-item">
            <a href="https://jsramverk.me" target="_blank" rel="noopener noreferrer" >jsramverk</a>
            </div>
            <div className="footer-item">
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" >Mozilla js</a>
            </div>
            </div>
        )
    }
}

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previous: "Initial",
            data: "Initial",
            user: null,
            status: false,
            token: '',
            location: "Initial",
            prevLocation: "Initial"
        };

        // this.getJWTFromLoginForm = this.getJWTFromLoginForm.bind(this);
        // this.getUserLoggedIn = this.getUserLoggedIn.bind(this);
        this.updateGrandparent = this.updateGrandparent.bind(this);
        this.updateLayoutWithLocations = this.updateLayoutWithLocations.bind(this);

    }

    componentDidMount() {
        console.log("componentDidMount - Layout!!");
        this.getData();
        console.log("this.state.previous = ");
        console.log(this.state.previous);
        console.log("this.state.data = ");
        console.log(this.state.data);
        // this.getJWTFromLoginForm(this.state.token);
        // this.getUserLoggedIn(this.state.userLoggedIn);
        /* Layout will be rerendered after setState() has been called */
    }


    componentDidUpdate() {
        console.log("componentDidUpdate - Layout!!");
        console.log("%cstatus = ", "color: gray; font-size: x-large");
        console.log(this.state.status);
        console.log("%ctoken = ", "color: gray; font-size: x-large");
        console.log(this.state.token);
        console.log("%clocation = ", "color: gray; font-size: x-large");
        console.log(this.state.location);
        console.log("%cprevLocation = ", "color: gray; font-size: x-large");
        console.log(this.state.prevLocation);
        // this.getData();
        // console.log(this.state.previous);
        // console.log(this.state.data);
        // this.getJWTFromLoginForm(this.state.token);
        // this.getUserLoggedIn(this.state.userLoggedIn);
        /* Layout will be rerendered after setState() has been called */
    }

    getData() {
        setTimeout(() => {
            console.log('Our data is fetched');
            this.setState({
                data: 'Hello WallStreet',
                previous: history,
            })
        }, 1)
    }

    updateGrandparent(user, status, token) {

        // GrandParent == Layout component
        console.log("Inside updateGrandparent!!");
        console.log("%cuser = ", "color: gray; font-size: x-large");
        console.log(user);
        console.log("%cstatus = ", "color: gray; font-size: x-large");
        console.log(status);
        console.log("%ctoken = ", "color: gray; font-size: x-large");
        console.log(token);

        this.setState({
            user: user,
            status: status,
            token: token
        });
    }



    updateLayoutWithLocations(location) {

        // GrandParent == Layout component
        console.log("Inside updateLayoutWithPrevLocations!!");
        console.log("%clocation = ", "color: gray; font-size: x-large");
        console.log(location);
        // console.log("%cprevLocation = ", "color: gray; font-size: x-large");
        // console.log(prevLocation);

        if (location !== this.state.location) {
            // if (location.pathname !== "/login" && location.pathname !== "/logout") {
                this.setState({
                    prevLocation: this.state.location,
                    location: location

                });
            // } else {
                this.setState({
                    location: location
                });
            // }
        }
    }

    static getDerivedStateFromProps(nextProps) {
        console.log("getDerivedStateFromProps() - Layout!!");
        console.log("nextProps = ");
        console.log(nextProps);
        /*if(nextProps.value !== this.state.value) {
        this.setState({no: nextProps.value});
    }*/
    return null;
}

render() {
    console.log("Layout will be rendered!");
    console.log("history.location.pathname = " + history.location.pathname);
    console.log("this.state.previous = " + this.state.previous);
    console.log("this.props in layout render = ");
    console.log(this.props);
    console.log("this.state in layout render = ");
    console.log(this.state);

    let goBack
    if (this.props.goBack) {
        goBack = this.props.goBack
    } else {
        goBack = -1
    }


    return (
        <div className="layout">
        <div className="wrap-all">

        <div>{"location = " + this.state.location.pathname}</div>
        <div>{"prevLocation = " + this.state.prevLocation.pathname}</div>
        <div className="outer-wrap outer-wrap-header">
        <div className="inner-wrap inner-wrap-header">
        <Header user={this.state.user} status={this.state.status}/>
        </div>
        </div>
        <div className="outer-wrap outer-wrap-navbar">
        <div className="inner-wrap inner-wrap-navbar">
        <Navbar/>
        </div>
        </div>
        <div className="outer-wrap outer-wrap-main">
        <div className="inner-wrap inner-wrap-main">
        {/*<Route exact path="/" component={Me} location={this.props.location} />*/}
        <Route exact path="/" render={(props) => <Me {...props} history={props.history} location={props.location} prevLocation={this.state.prevLocation} updateLayoutWithLocations={this.updateLayoutWithLocations}/>} />
        {/*<Route exact path="/reports" component={Reports} location={this.props.location}/>*/}
        <Route exact path="/reports" render={(props) => <Reports {...props} history={props.history} location={props.location} prevLocation={this.state.prevLocation} updateLayoutWithLocations={this.updateLayoutWithLocations}/>} />
        <Route path="/report/week/:no" component={Report} location={this.props.location}/>
        <Route path="/404" render={(props) => <Http404 {...props} location={props.location} history={props.history} previous={this.state.previous} state={"Dubai"}/>}/>
        <Route exact path="/registration" render={(props) => <Registration {...props} dateobj={{date: new Date()}} updateGrandparent={this.updateGrandparent} user={this.state.user} status={this.state.status} token={this.state.token} history={props.history} location={props.location} goBack={goBack - 1} location={props.location} prevLocation={this.state.prevLocation} updateLayoutWithLocations={this.updateLayoutWithLocations}/>} />
        {/* <Route exact path="/registration" render={(props) => <Registration {...props} dateobj={{date: new Date()}} history={props.history} previous={this.state.previous} state={"Dubai"}/>}/>  {/* Fungerar! */}
        {/*<Route path="/calendar/:year?/:month?/:day?" component={Calendar} location={this.props.location}/>*/}
        <Route path="/calendar/:year?/:month?/:day?" render={(props) => <Calendar {...props} location={this.props.location} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>
        <Route path="/calendar2/:year?/:month?/:day?" render={(props) => <Calendar2 {...props} location={this.props.location} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>
        {/*<Route exact path="/login" component={Login} sendTokenToParent={this.getJWTFromLoginForm} sendStatusToParent={this.getUserLoggedIn}/>*/}
        <Route exact path="/login" render={(props) => <Login {...props} updateGrandparent={this.updateGrandparent} user={this.state.user} status={this.state.status} token={this.state.token} history={props.history} location={props.location} goBack={goBack - 1} location={props.location} prevLocation={this.state.prevLocation} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>
        <Route exact path="/logout" render={(props) => <Logout {...props} updateGrandparent={this.updateGrandparent} user={this.state.user} status={this.state.status} token={this.state.token} history={props.history} location={props.location} goBack={goBack - 1} location={props.location} prevLocation={this.state.prevLocation} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>
        {/*<Route exact path="/users" component={Users}/>*/}
        <Route exact path="/users" render={(props) => <Users {...props} updateGrandparent={this.updateGrandparent} user={this.state.user} status={this.state.status} token={this.state.token} history={props.history} location={props.location} goBack={goBack - 1} location={props.location} prevLocation={this.state.prevLocation} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>
        <Route exact path="/user" render={(props) => <User {...props} updateGrandparent={this.updateGrandparent} user={this.state.user} status={this.state.status} token={this.state.token} history={props.history} location={props.location} goBack={goBack - 1} location={props.location} prevLocation={this.state.prevLocation} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>
        {/*<Route exact path="/add" component={NewUser}/>*/}
        {/*<Route exact path="/dbreports" component={DBReports}/>*/}
        {/*<Route exact path="/dbreports" render={(props) => <DBReports {...props} user={this.state.user} status={this.state.status} token={this.state.token} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>/>*/}
        <Route exact path="/dbreports" render={(props) => <DBReports {...props} user={this.state.user} status={this.state.status} token={this.state.token} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>/>
        <Route path="/dbreports/week/:id" render={(props) => <DBReports {...props} user={this.state.user} status={this.state.status} token={this.state.token} updateLayoutWithLocations={this.updateLayoutWithLocations}/>}/>/>
        <Route path="/dbreport/week/:no" component={DBReport} location={this.props.location}/>
        {/* <PrivateRoute path="/admin" component={Reports} />*/}
        {/*<Route exact path="/user" component={User}/>*/}
        <Redirect to="/404"/>
        <p>{"history.location.pathname in layout= " + history.location.pathname}</p>
        </div>
        </div>
        <div className="outer-wrap outer-wrap-footer">
        <div className="inner-wrap inner-wrap-footer">
        <Footer/>
        </div>
        </div>
        </div>
        </div>
    );
}
};

export default withRouter(Layout);
