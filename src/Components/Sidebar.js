import React from 'react';
/*import { BrowserRouter as Router, Link, Route } from 'react-router-dom';*/
import { Link } from 'react-router-dom';
import Button from './Button.js';

/*const sidenav = [
                    ["/report/week/1", "Week1"],
                    ["/report/week/2", "Week2"],
                    ["/report/week/3", "Week3"],
                ]*/

class Sidebar extends React.Component {
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //     // Initialize state here
    //     // Should only assign directly to state here
    //     // this.state = { no: 1};
    // }

    componentDidMount(event) {
        console.log("%ccomponentDidMount - Sidebar!!", "color: purple; font-size: x-large");
    }

    render() {

        console.log("this.props inside sidebar = ");
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
                    <div className={"sidebar-button" + (this.props.status ? "" : " hidden")}>
                        <Button toggleView={this.props.toggleView}/>
                    </div>
                </div>
            )
    }
}

export default Sidebar;
