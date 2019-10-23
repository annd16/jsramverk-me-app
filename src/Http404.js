import React from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from './Components/Sidebar.js'
import { isDate } from './Calendar/functions.js';

const sidenav = [
                    ["", ""],
                ]

/*class Http404 extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            location: "location",
            history: "history",
            previous: "previous",
        };*/
    /*}
    render() {*/

const Http404 = ({location, history, previous, state}) => {

    const description = "http 404: Page not found!";

    /*console.log("props in Http404 = ");
    console.log(props);*/

    if (location) {
        console.log("location.pathname in Http404 = ");
        console.log(location.pathname);
    }

    if (history && history.location) {
        console.log("history.location.pathname in Http404 = ");
        console.log(history.location.pathname);
    }
    if (previous && previous.location) {
        console.log("previous in Http404 = ");
        console.log(previous.location.pathname);
    }
    console.log("state in Http404 = ");
    console.log(state);

    /*console.log("props.previous in Http404 = ");
    console.log(props);*/
    /*const path = this.props.location.pathname;*/
    const path2 = history.location.pathname;

    const paths = [
        "/",
        "/reports",
        "/report/week/1",
        "/report/week/2",
        "/report/week/3",
        "/registration",
        "/calendar/2019/10/16"
    ]

    /*console.log("path = " + path);*/
    console.log("path2 = " + path2);
    console.log("state = " + state);
    if (paths.includes(path2)) {
        /* If last path was a valid path redirect to this path */
        /*return <p>{ path2 } is a valid path</p>*/
        console.log(path2 + " is a valid path!");
        return <Redirect to={history.location.pathname}/>;
    } else if (previous && previous.location !== undefined) {
        const theMatch = previous.location.pathname.match('/calendar/([0-9]{4})/([0-9]{1}[0-9]?)/([0-9]{1}[0-9]?)');
        console.log("%cThe match = ", "color: lightblue; font-size: x-large");
        console.log(theMatch);
        if (paths.includes(previous.location.pathname)) {
            console.log(previous.location.pathname + " is a valid path!");
            return <Redirect to={previous.location.pathname}/>;
            /* Start 191021 test */
        }  else if (theMatch && isDate(new Date(theMatch[1], theMatch[2], theMatch[3]))) {
                console.log("%c/calendar!!!", "color: darkbrown; font-size: x-large");
                return <Redirect to={previous.location.pathname}/>;
        } else {
            /*return <p>previous is defined but not a valid path!!</p>;*/
            console.log(previous.location.pathname + "%c, is NOT a valid path!", "color: blue; font-size: x-large");
            return (
               <main className="main">
                  <Sidebar sidenav={sidenav}/>

                  <div className="outer-wrap outer-wrap-article">
                      <div className="inner-wrap inner-wrap-article">
                          <article className="article">
                              <h1>Error</h1>
                              <p>{ description }</p>
                              <p>history.location.pathname in 404 = {history.location.pathname}</p>
                              if (previous && previous.location) {
                                 <p>prevloc in 404 = { previous.location.pathname }</p>
                              }

                          </article>
                      </div>
                  </div>
              </main>
            );
        }
    } else if (path2 === undefined) {
        console.log("path2 = " + path2);
        return null;
    } else if (path2 === "/404") {
        console.log("path2 = " + path2);
        /*if (previous && previous.location !== undefined) {
            console.log("previous.location.pathname = " + previous.location.pathname);
            if (previous.location.pathname !== "/404") {
                /*return <p>If Hello!</p>;*/
                /*return <Redirect to={history.location.pathname}/>;
            } else {
                return <p>Else Hello2!</p>;
            }
        }*/
        /* return <p>NOT Hello!</p>; /* Ska kommenteras bort */
        return null;
}  else {
        const myString = path2 + ", is NOT a valid path!";
        console.log("%c" + myString, "color: darkbrown; font-size: x-large");
        return (
           <main className="main">
              <Sidebar/>

              <div className="outer-wrap outer-wrap-article">
                  <div className="inner-wrap inner-wrap-article">
                      <article className="article">
                          <h1>Error</h1>
                          <p>{ description }</p>
                          <p>history.location.pathname in 404 = {history.location.pathname}</p>
                      </article>
                  </div>
              </div>
          </main>
        );
    }
};

export default Http404;
