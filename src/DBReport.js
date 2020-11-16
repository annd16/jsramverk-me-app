import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';
import Text1 from ".\\Text1.js";
import Text2 from ".\\Text2.js";

import Sidebar from './Components/Sidebar.js'


const url = 'https://github.com/annd16/jsramverk-me-app';
const display = 'me-app on GitHub';

const week1 = Text1;
const week2 = Text2;
const week3 = "This is where the report for week3 will end up.";
const week4 = "";
const week5 = "";
const week6 = "";


let kmoms = [
                    week1,
                    week2,
                    week3,
                    week4,
                    week5,
                    week6
                ]

// const sidenav = [
//                     ["/report/week/1", "Week1"],
//                     ["/report/week/2", "Week2"],
//                     ["/report/week/3", "Week3"],
//                 ]

var port = 1337;
var route = "/dbreports/week/"

class Week extends React.Component {
  constructor(props) {
      super(props);
      console.log("props in Week constructor =  ");
      console.log(props);
      // Initialize state here
      // Should only assign directly to state here
      this.state = { id: ""};
  }

  // A controller is created to be able to cancel the fetching in componentWillUnmount
  controller = new AbortController();

  fetchReport = (id) => {
      console.log("inside fetchReport!!");
      console.log("http://localhost:'+ port + '/dbreports/week/' + id");
      console.log("http://localhost:"+ port + route + id);
      fetch('http://localhost:'+ port + '/dbreports/week/' + id, {
          method: "GET",
          headers: {
              'Content-type': 'application/json',
              'Accept-Charset': 'utf-8'
          },
          signal: this.controller.signal
          // body: JSON.stringify(this.state)
      })
      .then((response) => response.json())
      .then((result) => {
          console.log("Something has been fetched inside week!!");
          console.log("result = ");
          console.log(result);

          console.log("%cid inside fetch.then!!", "color: purple; font-size: x-large");
          console.log(this.props.id);
          if (Array.isArray(result.data) && result.data.length) {
              console.log("result.data in WEEK is an array and it is not empty!!");
              // document.getQuerySelector("text").value  = result.data[0].content !== null ? result.data[0].content : "";
              // setReport(report);//Set value on input field with id = "input-title"


              this.setState({
                  id: result.data[0].id !== null ? result.data[0].id : "",
                  // id: this.props.id,
                  title: result.data[0].title !== null ? result.data[0].title : "",
                  content: result.data[0].content !== null ? result.data[0].content : "",
                  // mode: "edit"
              });
          } else {
              console.log("result.data in Week-fetch is an array but it is empty!!");
              // // document.getElementById("input-title").value = ""; //Set value on input field with id = "input-title"
              // document.getQuerySelector("text").value  = result.data[0].content !== null ? result.data[0].content : ""; //Set value on input field with id = "input-title"
          }
      })
      .catch(err => {
          if (err.name === 'AbortError') {
              console.log('Fetch aborted');
          } else {
              console.error('An error has occured while fetching data in DBreport', err);
              // return () => ac.abort(); // Abort fetches on unmount
          }
      })
  }


  componentDidMount() {
      console.log("%ccomponentDidMount - Week-component in DBreport!!", "color: purple; font-size: x-large");
      // this.props.updateLayoutWithLocations(this.props.location);

      console.log("%cthis.props in Week-component in DBreport!! componentDidMount = ", "color: pink; font-size: large");
      console.log(this.props);
      // console.log("A registration form was submitted from " + this.state.name);
      console.log("this.state = ");
      console.log(this.state);


     // this.props.updateDBReportsWithId(this.props.value);
      this.props.updateDBReportsWithId(this.props.id);

      // this.props.updateDBReportWithLocations(this.props.location.pathname);

      this.fetchReport(this.props.id);

      var path = route + this.props.id;

      this.props.updateDBReportWithLocations(path);


       // this.fetchReport(this.props.value);

      // fetch('http://localhost:'+ port + '/dbreport/' + this.props.value, {
      //     method: "GET",
      //     headers: {
      //         'Content-type': 'application/json',
      //         'Accept-Charset': 'utf-8'
      //     },
      //     signal: this.controller.signal
      //     // body: JSON.stringify(this.state)
      // })
      // .then((response) => response.json())
      // .then((result) => {
      //     console.log("Something has been fetched!!");
      //     console.log("result = ");
      //     console.log(result);
      //     if (Array.isArray(result.data) && result.data.length) {
      //         console.log("result.data is an array and it is not empty!!");
      //         // document.getQuerySelector("text").value  = result.data[0].content !== null ? result.data[0].content : "";
      //         // setReport(report);//Set value on input field with id = "input-title"
      //         this.setState({
      //             id: result.data[0].id !== null ? result.data[0].id : "",
      //             title: result.data[0].title !== null ? result.data[0].title : "",
      //             content: result.data[0].content !== null ? result.data[0].content : "",
      //             // mode: "edit"
      //         });
      //     } else {
      //         console.log("result.data is an array but it is empty!!");
      //         // // document.getElementById("input-title").value = ""; //Set value on input field with id = "input-title"
      //         // document.getQuerySelector("text").value  = result.data[0].content !== null ? result.data[0].content : ""; //Set value on input field with id = "input-title"
      //     }
      // })
      // .catch(err => {
      //     if (err.name === 'AbortError') {
      //         console.log('Fetch aborted');
      //     } else {
      //         console.error('An error has occured while fetching data in DBreport', err);
      //         // return () => ac.abort(); // Abort fetches on unmount
      //     }
      // })
  }

  componentDidUpdate(prevProps) {
      console.log("componentDidUpdate - Week!!");
          // prevProps is the props BEFORE update
          if (prevProps.id !== this.props.id) {
              console.log("%cid has been changed in Week componentDidUpdate()", "color: purple; font-size: x-large;");
              this.fetchReport(this.props.id);
              // this.props.updateDBReportsWithId(this.props.id);

              this.setState({
                  // title: result.data[0].title,
                  id: this.props.id
                  // mode: "edit"
              });

              var path = route + this.props.id;

              this.props.updateDBReportWithLocations(path);
          }



  }

  componentWillUnmount () {
      // this.cancelablePromise.cancel(); // Cancel the promise
      console.log("%cThe dbreport week component will be unmounted!", "color: purple; font-size: x-large;");
      this.controller.abort();
  }

  render() {

      // if (match.params.id in kmoms) {
        if (this.props.id && this.props.id in kmoms) {
            return (
                <div className="articleWeek">
                    <span className='title'>Week </span>
                    <span>{this.props.id}</span>

                    <div>this.props.id: {this.props.id}</div>
                    <div>this.state.id: {this.state.id}</div>

                    <span className='link'><a className='report' href={url} target='_blank' rel='noopener noreferrer'>{display}</a></span>

                    {/* Display what's in the kmom variable */}
                    {/* }<div className="text"><pre>{kmoms[(this.props.value)-1]}</pre></div> */}
                    <div className="text"><pre>{ this.state.content }</pre></div>

                </div>
            );
        } else {
            return (
            <div className="articleWeek">
                <span className='title'>Week </span>
                <span>{this.props.id}</span>

                <div>this.props.id: {this.props.id}</div>
                <div>this.state.id: {this.state.id}</div>

                <span className='link'><a className='report' href={url} target='_blank' rel='noopener noreferrer'>{display}</a></span>

                {/* Display what's in the kmom variable */}
                {/* }<div className="text"><pre>{kmoms[(this.props.value)-1]}</pre></div> */}
                <div className="text"><pre>{ "" }</pre></div>

            </div>
        )

        // } else {
        //     return (
        //         <Redirect to="/404"/>
        //     );
        // }
        }
}

}


// A FUNCTIONAL COMPONENT
const DBReport = (props) => {

    console.log("In DBReport!!");
    console.log("props = ");
    console.log(props);          // 1 in /dbreports2
    console.log("props.id = ");
    console.log(props.id);          // 1 in /dbreports2

    var updateDBReportsWithId = props.updateDBReportsWithId;
    var updateDBReports2WithLocations = props.updateDBReports2WithLocations;

    var [ ids, setIds ] = useState([]);
    var [ report, setReport ] = useState([]);
    var [ fetched, setFetched ] = useState(false);
    var [ fetched2, setFetched2 ] = useState(false);
    var [ id, setId ] = useState(0);
    var [ id, setLocation ] = useState("");
    // const [ showDetails, setShowDetails ] = useState(false);
    // const fetchUsers = async () => {

    const ac = new AbortController();

    // const fetchIds = () => {
    //     console.log("%cInside fetchIds in DBReport", "color: purple; font-size: large");
    //     fetch('http://localhost:'+ port + '/dbreports2', {
    //         method: "GET",
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Accept-Charset': 'utf-8'
    //         },
    //         signal: ac.signal
    //         // body: JSON.stringify(this.state)
    //     })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("Something has been fetched!!");
    //         console.log("result = ");
    //         console.log(result);
    //         // Convert it to a value array:
    //         var anArray = Object.entries(result.data);
    //         console.log(anArray);
    //         ids = result.data.map((val) => {
    //             console.log("val = ");
    //             console.log(val);
    //             // var route = "/dbreport/week/" + val["id"];
    //             var route = "/dbreports2/week/" + val["id"];
    //             var item = "Week" + val["id"];
    //             // return val["id"];
    //             return [route, item];
    //         });
    //
    //
    //         setIds(ids);
    //         // console.log("sidenav = ");
    //         // console.log(sidenav);
    //
    //         // Save new values to state
    //         // this.setState({
    //         //     ids: sidenav
    //         // })
    //
    //     }).then(() => setFetched(true))
    //     .catch(err => {
    //         if (err.name === 'AbortError') {
    //             console.log('Fetch aborted');
    //         } else {
    //             console.error('An error has occured while fetching data in DBreport', err);
    //             // return () => ac.abort(); // Abort fetches on unmount
    //         }
    //     })
    // }

    const updateDBReportsWithId2 = (id) => {
        console.log("Inside updateDBReportsWithId2 in DBReport!!");
        console.log("%cid = ", "color: gray; font-size: x-large");
        console.log(id);

        setId(id);
    }


    const updateDBReportWithLocations = (location) => {
        console.log("Inside updateDBReportsWithlocation in DBReport!!");
        console.log("%clocation = ", "color: gray; font-size: x-large");
        console.log(location);

        setLocation(location);
    }


    useEffect(() => {
        console.log("%cinside useEffect!!", "color: pink; font-size: large");
        // fetchIds(ids);      // This will be run when component mounts

        updateDBReportsWithId(props.id);
        updateDBReports2WithLocations(props.location);

        // setId(id);


        console.log("id in useEffect = ");
        console.log(props.id);

        // fetchReport(id);
        // Anything in the return statement will be run on component unmount,
        // so in this case any fetch that is going on will be aborted.
        return () => ac.abort(); },
        [] );      // Component will only be rendered once!
        // [ids] );      // Component will only be re-rendered if any id has changed (But this didn't work it
        //            // resulted in an infinite loop of fetches etc!)



    console.log("ids = ");
    console.log(ids);

    // componentDidMount: function(event) =>  {
    //     console.log("%ccomponentDidMount - DBReports2!!", "color: purple; font-size: x-large");
    //     this.props.updateLayoutWithLocations(this.props.location);
    //
    //     console.log("%cthis.props in DBReports2 componentDidMount = ", "color: pink; font-size: large");
    //     console.log(this.props);
    //     // console.log("A registration form was submitted from " + this.state.name);
    //     console.log("this.state = ");
    //     console.log(this.state);
    //     fetch('http://localhost:'+ port + '/dbreports2', {
    //         method: "GET",
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Accept-Charset': 'utf-8'
    //         },
    //         signal: this.controller.signal
    //         // body: JSON.stringify(this.state)
    //     })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("Something has been fetched!!");
    //         console.log("result = ");
    //         console.log(result);
    //         // Convert it to a value array:
    //         var anArray = Object.entries(result.data);
    //         console.log(anArray);
    //         sidenav = result.data.map((val) => {
    //             console.log("val = ");
    //             console.log(val);
    //             var route = "/report/week/" + val["id"];
    //             var item = "Week" + val["id"];
    //             // return val["id"];
    //             return [route, item];
    //         });
    //         console.log("sidenav = ");
    //         console.log(sidenav);
    //
    //         // Save new values to state
    //         this.setState({
    //             ids: sidenav
    //         })
    //         // this.sendDataToParent(result);
    //         // sidenav = [
    //         //     ["/report/week/1", "Week1"],
    //         //     ["/report/week/2", "Week2"],
    //         //     ["/report/week/3", "Week3"],
    //         // ]
    //
    //         // cancelablePromise
    //         //     .promise
    //         //     .then(() => console.log('resolved'))
    //         //     .catch((reason) => console.log('isCanceled', reason.isCanceled));
    //
    //     }).catch(err => {
    //         if (err.name === 'AbortError') {
    //             console.log('Fetch aborted');
    //         } else {
    //             console.error('An error has occured while fetching data in DBreports2', err);
    //         }
    //     })
    // },


    // componentWillUnmount () {
    //     // this.cancelablePromise.cancel(); // Cancel the promise
    //     console.log("%cThe dbreports2 component will be unmounted!", "color: purple; font-size: x-large;");
    //     this.controller.abort();
    // }

    return (
            <div className="outer-wrap outer-wrap-article">
                <div className="inner-wrap inner-wrap-article">
                    <article className="article" id="articleReport">
                        <h1>Report</h1>
                        <p className="route">( id:  { props.id } )</p>
                        <Week id={props.id} content={ report } updateDBReportsWithId={ updateDBReportsWithId2 } updateDBReportWithLocations={ updateDBReportWithLocations }/>
                        { console.log("id = ") }
                        { console.log(props.id) }
                        { console.log("props.location in DBReport = ") }
                        { console.log(props.location) }
                        {/*{ "match = " + match }*/}
                    </article>
                </div>
            </div>
    );
};

export default DBReport;
