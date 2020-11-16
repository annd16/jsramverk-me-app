import React from 'react';

import { withRouter } from 'react-router-dom';

import Sidebar from './Components/Sidebar.js';

import ShowLocationAndHistory from './Components/ShowLocationAndHistory.js';

const description = "This is my page for reports!";

const sidenav = [
    ["/report/week/1", "Week1"],
    ["/report/week/2", "Week2"],
    ["/report/week/3", "Week3"],
]

class Reports extends React.Component {
    mainClass = "main " + this.props.location.pathname.slice(1);

    componentDidMount() {
        console.log("componentDidMount - Reports!!");
        console.log("this.props = ");
        console.log(this.props);
        // One has to set state in componentDidMount otherwise this.props.xxxx will be undefined!!
        // this.setState({location: this.props.location});
        this.props.updateLayoutWithLocations(this.props.location);



    }
    // static getDerivedStateFromProps(props, state) {
    //     console.log("getDeriveSStateFromProps!!");
    // }


    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate - Reports!!");
            // prevProps is the props BEFORE update
            if (prevProps.location !== this.props.location) {
                console.log("Location has been changed in Reports componentDidUpdate()");
            }

            if (prevProps.prevLocation !== this.props.prevLocation) {
                console.log("prevLocation has been changed in Reports componentDidUpdate()");
            }
    }

    render() {
        return (
            <main className={this.mainClass}>
                <Sidebar sidenav={sidenav}/>
                <div className="outer-wrap outer-wrap-article">
                <ShowLocationAndHistory/>
                    <div className="inner-wrap inner-wrap-article">
                        <article className="article">
                            <h1>Reports</h1>
                            <p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>
                            <div className="description">{ description }</div>
                        </article>
                    </div>
                </div>
            </main>
        );
    }
};


export default withRouter(Reports);
