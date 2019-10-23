import React from 'react';

import Sidebar from './Components/Sidebar.js'

const description = "This is my page for reports!";

const sidenav = [
    ["/report/week/1", "Week1"],
    ["/report/week/2", "Week2"],
    ["/report/week/3", "Week3"],
]

class Reports extends React.Component {
    mainClass = "main " + this.props.location.pathname.slice(1);

    render() {
        return (
            <main className={this.mainClass}>
                <Sidebar sidenav={sidenav}/>
                <div className="outer-wrap outer-wrap-article">
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


export default Reports;
