import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

const week1 = "This is the link to my GitHub repo for my me-app in jsramverk: ";

/*var aElement = document.createElement("a");
aElement.innerHTML = "<a href='https://github.com/annd16/jsramverk-me-app' target='_blank' rel='noopener noreferrer'>jsramverk/me-app på GitHub</a>";
var articleReport = document.getElementById('articleReport');
articleReport.appendChild(aElement);*/


const week2 = "This is the report for week2.";
const week3 = "This is the report for week3.";

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

/*const Report = () => {*/
const description = "This is my report-page!";


class Week extends React.Component {
  constructor(props) {
      super(props);
      console.log(props);
      /*this.state = { no: props.value};*/
      this.state = { no: props.value};
    }

    componentWillReceiveProps(nextProps) {
        console.log("I have received a prop!!");
        console.log("nextProps = ");
        console.log(nextProps);
      if(nextProps.value !== this.state.value) {
        this.setState({no: nextProps.value});
      }
  }
    /*getDerivedStateFromProps(nextProps) {
        console.log("I will get the derived state from props!!");
        console.log("nextProps = ");
        console.log(nextProps);
        if(nextProps.value !== this.state.value) {
            this.setState({no: nextProps.value});
        }
    }*/
    render() {
        /*if (kmoms[(this.state.no-1)] !== null) {*/
        /* var car = {make: 'Honda', model: 'Accord', year: 1998};

        console.log('make' in car);
        // expected output: true
        delete car.make;
        if ('make' in car === false) {
        car.make = 'Suzuki';
        }

        console.log(car.make);
        // expected output: "Suzuki"*/

        /*// Arrays
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
0 in trees        // returns true
3 in trees        // returns true
6 in trees        // returns false
'bay' in trees    // returns false (you must specify the index number, not the value at that index)
'length' in trees // returns true (length is an Array property)
Symbol.iterator in trees // returns true (arrays are iterable, works only in ES2015+)*/

        if (this.state.no-1 in kmoms) {
            return (
                <div className="article">
                <span className='title'>Week </span>
                <span>{this.state.no}</span>
                <p>{kmoms[(this.state.no)-1]}</p>
                <div>The value is: {this.state.no}</div>
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
                    <p>(Route: { match.url })</p>
                    <Week value={match.params.no}/>
                    { console.log("match = ") }
                    { console.log(match) }
                    <p>{ "match = " + match }</p>
                </article>
            </div>
        </div>
    </main>
  );
};

export default Report;
