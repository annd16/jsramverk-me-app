import React from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, NavLink } from 'react-router-dom';
import Me from './Me.js';
import Reports from './Reports.js';
import Report from './Report.js';
import Http404 from './Http404.js';

import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

const headerText = "Annas me-app (React)";

const navbar = [
                    ["/", "Me"],
                    ["/reports", "Reports"],
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

/*const Layout = () => {*/
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previous: "Initial",
            data: "Initial",
        };
    }

    /*componentDidMount() {
        console.log("componentDidMount()");
        console.log("history.location.pathname = " + history.location.pathname);
        /*const prevLocation = this.state.prevLocation;*/
        /*this.setState((prevLocation) => { prevLocation = history.location.pathname })*/
        /*this.setState({ data: "Göran", prevLocation: history.location.pathname })
        console.log("this.state.prevLocation = " + this.state.prevLocation);
    }*/

    getDerivedStateFromProps(nextProps) {
        console.log("I will get the derived state from props!!");
        console.log("nextProps = ");
        console.log(nextProps);
        if(nextProps.value !== this.state.value) {
            this.setState({no: nextProps.value});
        }
    }

    getData(){
    setTimeout(() => {
      console.log('Our data is fetched');
      this.setState({
        data: 'Hello WallStreet',
        previous: history,
      })
    }, 1)
  }

  componentDidMount(){
    this.getData();
    console.log(this.state.previous);
    console.log(this.state.data);
    /* Layout will be rerendered after setState() has been called */
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
                        {/*<Route path="/404" component={Http404} location={this.props.location} history={history.location} previous={this.state.prevLocation}/>*/}
                        <Route path="/404" render={(props) => <Http404 {...props} location={props.location} history={props.history} previous={this.state.previous} state={"Dubai"}/>}/>

                        <Redirect to="/404"/>
                        {"history.location.pathname in layout= " + history.location.pathname}
                        {/*{"\ndata = " + this.state.data}*/}
                        {/*{"\nprevLocation = " + this.state.previous}*/}
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
