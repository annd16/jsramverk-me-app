import React from 'react';
/*import { BrowserRouter as Router, Link, Route } from 'react-router-dom';*/

import mepic from './css/me-cropped.png';


class Sidebar extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
   };
}
    render() {
        return (
            <div className="sidebar sidebar-left">
                <ul>
                    {/*<li className="nav-item">
                        <Link to="/reports/week/1">Week 1</Link>
                        </li>*/}
                    </ul>
            </div>
        )
    }
}


class Me extends React.Component {
    /*constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
   };
}*/
    render() {


const description = "This is my me-webpage in the programming course 'jsramverk'.\n" +
"My name is Anna and I live in Stockholm. At the moment I'm learning how to program for the webb at BTH, " +
"and this is something that I enjoy very much.";
  return (
      <main className="main">
    <Sidebar/>
    <div className="outer-wrap outer-wrap-article">
        <div className="inner-wrap inner-wrap-article">
            <article className="article">
                <h2>Me</h2>
                <p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>
                <div className="img-wrap">
                <figure>
                    <img className="me" src={mepic} alt='Me'></img>
                    <figcaption>Fig1. Picture of me</figcaption>
                </figure>
                </div>
                <p className='text'>{ description }</p>
            </article>
            </div>
        </div>
    </main>
  );
};
}

export default Me;
