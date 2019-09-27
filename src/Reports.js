import React from 'react';
/*import { BrowserRouter as Router, Link, Route } from 'react-router-dom';*/
import { Link } from 'react-router-dom';
/*import Report from './Report.js';*/

const sidenav = [
                    ["/report/week/1", "Week1"],
                    ["/report/week/2", "Week2"],
                    ["/report/week/3", "Week3"],
                ]

class Sidebar extends React.Component {

    render() {
        return (
            <div className="sidebar sidebar-left">
            <ul>
                {sidenav.map(function(item, i) {
                    const navbarItem =
                    <li className="sidenav-item" key={i}>
                        <Link to={item[0]}>{item[1]}</Link>
                    </li>;
                    return navbarItem;
                })}

            </ul>
            </div>
        )
    }
}

const description = "This is my page for reports!";


class Reports extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            location: "",
        };
    };*/


render() {
  return (
     <main className="main">

        <Sidebar/>

        <div className="outer-wrap outer-wrap-article">
            <div className="inner-wrap inner-wrap-article">
                <article className="article">
                    <h1>Reports</h1>
                    <p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>
                    { description }
                </article>
            </div>
        </div>
    </main>
  );
}
};


export default Reports;
