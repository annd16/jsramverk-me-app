import React from 'react';
/* react-router-dom creates DOM bindings for React Roter which is
a collection of navigational components.*/
/*import { BrowserRouter as Router, Link, Route} from 'react-router-dom';*/
import { BrowserRouter as Router} from 'react-router-dom';
import logo from './css/logo.svg';
import './css/App.css';
import './css/index.css';

import {createBrowserHistory} from 'history';
import Layout from './Layout.js';

const history = createBrowserHistory()

class App extends React.Component {

    render() {
        console.log("\nthis.props in App-render: ")
        console.log(this.props);            /* An empty object! */
        return (
            <Router>
             {"history.location.pathname in <Router> in App.js = " + history.location.pathname /* Displays the route! */}
                <Layout location={this.props.location} params={this.props.params}/>
                {/*{"\nthis.props.location in <Router> in App= " + this.props.location}*/}
                {console.log("this.props inside Router in App.js= " )}
                {console.log(this.props) /* An empty object! */}
                {/*{this.props.forEach(function(prop) {
                    console.log("\nthis.props property in App= " + prop)
                })}*/}
            </Router>
        )
    }
}

export default App;
