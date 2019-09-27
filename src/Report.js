import React from 'react';
/*import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';*/
import { Link, Redirect } from 'react-router-dom';
/*import ReactDOM from "react-dom";*/

const url = 'https://github.com/annd16/jsramverk-me-app';
const display = 'me-app on GitHub';

/*const externalLink = ({url, display}) => {
  return (
      "<a href=" + url + " target='_blank' rel='noopener noreferrer'>" + display + "</a>"
  );
};*/

/*function externalLink(url, display) {
    if (url && display) {
        return (
          "<a href=" + url + " target='_blank' rel='noopener noreferrer'>" + display + "</a>"
        );
    } else
        return "";
 };*/

const week1 = "Link to my GitHub repo for this me-app:";
const week2 = "This is where the report for week2 will end up.";
const week3 = "This is where the report for week3 will end up.";

let kmoms = [
                    week1,
                    week2,
                    week3,
                ]

const sidenav = [
    ["/report/week/1", "Week1"],
    ["/report/week/2", "Week2"],
    ["/report/week/3", "Week3"],
]


class Week extends React.Component {
  constructor(props) {
      super(props);
      console.log(props);
      // Initialize state here
      // Should only assign directly to state here
      this.state = { no: 1};
  }

  render() {
        if (this.props.value-1 in kmoms) {
            return (
                <div className="articleWeek">
                    <span className='title'>Week </span>
                    <span>{this.props.value}</span>

                    {/* Display what's in the kmom variable */}
                    <p>{kmoms[(this.props.value)-1]}</p>

                    <a className='report' href={url} target='_blank' rel='noopener noreferrer'>{display}</a>

                    <div>this.props.value: {this.props.value}</div>
                </div>
            );
        } else {
            return (
                <Redirect to="/404"/>
            );
        }
        }
}


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

const Report = ({match}) => {
    return (
        <main className="main">
            <Sidebar/>
            <div className="outer-wrap outer-wrap-article">
                <div className="inner-wrap inner-wrap-article">
                    <article className="article" id="articleReport">
                        <h1>Report</h1>
                        <p className="route">( match.url:  { match.url } )</p>
                        <Week value={match.params.no}/>
                        { console.log("match = ") }
                        { console.log(match) }
                        {/*{ "match = " + match }*/}
                    </article>
                </div>
            </div>
        </main>
    );
};

export default Report;
