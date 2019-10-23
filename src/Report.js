import React from 'react';

import { Redirect } from 'react-router-dom';
import Text1 from ".\\Text1.js";
import Text2 from ".\\Text2.js";

import Sidebar from './Components/Sidebar.js'


const url = 'https://github.com/annd16/jsramverk-me-app';
const display = 'me-app on GitHub';

const week1 = Text1;
const week2 = Text2;
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

                    <div>this.props.value: {this.props.value}</div>

                    <span className='link'><a className='report' href={url} target='_blank' rel='noopener noreferrer'>{display}</a></span>

                    {/* Display what's in the kmom variable */}
                    <div className="text"><pre>{kmoms[(this.props.value)-1]}</pre></div>

                </div>
            );
        } else {
            return (
                <Redirect to="/404"/>
            );
        }
        }
}

const Report = ({match}) => {
    return (
        <main className="main report">
            <Sidebar sidenav={sidenav}/>
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
