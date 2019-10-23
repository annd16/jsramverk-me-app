import React from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import Me from './Me.js';
import Reports from './Reports.js';
import Report from './Report.js';
import Http404 from './Http404.js';
import Registration from './Registration.js';
import Calendar from './Calendar/Calendar.js';

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
];

class Header extends React.Component {
    render() {
        return (
            <header>
            <div className="header">
            <h1>{headerText}</h1>
            {/* "history.location.pathname = " + history.location.pathname */}
            {<p className='sign'>Under construction!</p>}
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
        };
    }


    componentDidMount() {
        console.log("componentDidMount - Layout!!");
        this.getData();
        console.log(this.state.previous);
        console.log(this.state.data);
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
    console.log("this.props in layout = ");
    console.log(this.props);

    return (
        <div className="layout">
        <div className="wrap-all">
        <div className="outer-wrap outer-wrap-header">
        <div className="inner-wrap inner-wrap-header">
        <Header/>
        </div>
        </div>
        <div className="outer-wrap outer-wrap-navbar">
        <div className="inner-wrap inner-wrap-navbar">
        <Navbar/>
        </div>
        </div>
        <div className="outer-wrap outer-wrap-main">
        <div className="inner-wrap inner-wrap-main">
        <Route exact path="/" component={Me} location={this.props.location} />
        <Route exact path="/reports" component={Reports} location={this.props.location}/>
        <Route path="/report/week/:no" component={Report} location={this.props.location}/>
        <Route path="/404" render={(props) => <Http404 {...props} location={props.location} history={props.history} previous={this.state.previous} state={"Dubai"}/>}/>
        <Route exact path="/registration" component={Registration} dateobj={{date: new Date()}}/>
        {/* <Route exact path="/registration" render={(props) => <Registration {...props} dateobj={{date: new Date()}} history={props.history} previous={this.state.previous} state={"Dubai"}/>}/>  {/* Fungerar! */}
        <Route path="/calendar/:year?/:month?/:day?" component={Calendar} location={this.props.location}/>
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

export default Layout;
