import React from 'react';
/*import { BrowserRouter as Router, Link, Route } from 'react-router-dom';*/
import { Link } from 'react-router-dom';
/*import Report from './Report.js';*/

/*const sidenav = [
                    ["/report/week/1", "Week1"],
                    ["/report/week/2", "Week2"],
                    ["/report/week/3", "Week3"],
                ]*/

class Sidebar extends React.Component {
    /*constructor(props) {
        super(props);
        console.log(props);
        // Initialize state here
        // Should only assign directly to state here
        this.state = { no: 1};
    }*/

    render() {
        console.log(this.props);
        this.props.sidenav.forEach(function(item, i) {
            console.log(i + " " + item );
        });
        return (
            <div className="sidebar sidebar-left">
                {this.props.optionalComp ? this.props.optionalComp : ""}
                <ul>
                    {
                        this.props.sidenav.map(function(item, i) {
                            const navbarItem =
                            <li className="sidenav-item" key={i}>
                                <Link to={item[0]}>{item[1]}</Link>
                            </li>;
                            return navbarItem;
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Sidebar;
