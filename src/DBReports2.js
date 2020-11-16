import React from 'react';

import Sidebar from './Components/Sidebar.js'

import FormReport2 from './Form/Form_report2.js';

import DBReport from './DBReport.js';

const description = "This is my page for reports!";

var sidenav = [];

const port = 1337;

// const cancelablePromise = makeCancelable(
//     new Promise(r => component.setState({ids: sidenav}))
// );


const Modal = (props) => {
    var className = "modal" + props.class;
    if (props.statusCode === 200 || props.statusCode === 201) {
        return <div className={className + " success"}>Success!!</div>
    } else {
        return <div className={className + " warning"}>Failure!!</div>
    }
}



class DBReports2 extends React.Component {
    mainClass = "main " + this.props.location.pathname.slice(1);
    path = this.props.location.pathname.substring(1);
    mainClass2 = "main " + this.path.substring(0, this.path.indexOf("/"));
    // A controller is created to be able to cancel the fetching in componentWillUnmount
    controller = new AbortController();

    constructor(props) {
        super(props);
        console.log("props in DBReports2 constructor = ");
        console.log(props);
        // Initialize state here
        // Should only assign directly to state here
        this.state = {
            ids: [],
            status: false,
            formIsOpen: false,
            formIsSubmitted: false,
            id: 0
        };

        this.updateDBReports = this.updateDBReports.bind(this);
        this.updateDBReportsWithId = this.updateDBReportsWithId.bind(this);
        this.updateDBReportsWithIds = this.updateDBReportsWithIds.bind(this);
        this.updateDBReportsFormData = this.updateDBReportsFormData.bind(this);
    }


    toggleView = () => this.setState({formIsOpen: !this.state.formIsOpen})

    createSidenav = (arrayWithObjects) => {
        sidenav = arrayWithObjects.map((val) => {
            console.log("val = ");
            console.log(val);
            var route = "/dbreports/week/" + val["id"];
            var item = "Week" + val["id"];
            // return val["id"];
            return [route, item];
        });
        return sidenav;
    }

    componentDidMount(event) {
        console.log("%ccomponentDidMount - DBReports2!!", "color: purple; font-size: x-large");
        console.log("%cthis.props.location.pathname.slice(1) ", "color: orange; font-size: large");
        console.log(this.mainClass);
        console.log(this.mainClass2);
        // console.log(this.props.location.pathname.slice(1));
        // console.log("%cthis.props.location.pathname.substring(0, str.indexOf('/')); ", "color: orange; font-size: large");
        // var path = this.props.location.pathname.substring(1);
        // console.log(path);
        // console.log(this.props.location.pathname.substring(1, this.props.location.pathname.indexOf("/")));
        // console.log("path.substring(0, path.indexOf('/'))");
        // console.log(path.substring(0, path.indexOf("/")));
        // console.log(this.props.location.pathname.substring(1));
        // console.log(this.props.location.pathname.indexOf("/"));
        // console.log(path.indexOf("/"));

        this.props.updateLayoutWithLocations(this.props.location);

        console.log("%cthis.props in DBReports2 componentDidMount = ", "color: pink; font-size: large");
        console.log(this.props);
        console.log("%cthis.props.match.params.id in DBReports2 componentDidMount = ", "color: pink; font-size: large");
        console.log(this.props.match.params.id);

        var id1 = this.props.match.params.id;

        if (id1 !== undefined) {
            this.setState({
                id: id1
            })
        }

        // console.log("A registration form was submitted from " + this.state.name);
        console.log("this.state = ");
        console.log(this.state);
        fetch('http://localhost:'+ port + '/dbreports', {
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
            var sidenav = [];
            console.log("Something has been fetched!!");
            console.log("result = ");
            console.log(result);
            // Convert it to a value array:
            var anArray = Object.entries(result.data);
            console.log("anArray = ");
            console.log(anArray);
            var anArray2 = Object.values(result.data);
            console.log("anArray2 = ");
            console.log(anArray2);
            // sidenav = anArray2.map((val) => {
            //     console.log("val = ");
            //     console.log(val);
            //     var route = "/dbreports/week/" + val["id"];
            //     var item = "Week" + val["id"];
            //     // return val["id"];
            //     return [route, item];
            // });

            sidenav = this.createSidenav(anArray2);
            console.log("sidenav = ");
            console.log(sidenav);

            // Save new values to state
            this.setState({
                ids: sidenav
            })
            // this.sendDataToParent(result);
            // sidenav = [
            //     ["/report/week/1", "Week1"],
            //     ["/report/week/2", "Week2"],
            //     ["/report/week/3", "Week3"],
            // ]

            // cancelablePromise
            //     .promise
            //     .then(() => console.log('resolved'))
            //     .catch((reason) => console.log('isCanceled', reason.isCanceled));

        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('An error has occured while fetching data in DBreports2', err);
            }
        })
    }

    componentDidUpdate(prevProps) {
        console.log("%ccomponentDiUpdate - DBReports2!!", "color: purple; font-size: x-large");
        console.log("this.props.match.params.id = ");
        console.log(this.props.match.params.id);
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            })
            this.props.updateLayoutWithLocations(this.props.location);
        }


    }

    componentWillUnmount () {
        // this.cancelablePromise.cancel(); // Cancel the promise
        console.log("%cThe dbreports2 component will be unmounted!", "color: purple; font-size: x-large;");
        this.controller.abort();
    }

    updateDBReports2WithLocations(location) {

        // GrandParent == Layout component
        console.log("Inside updateDBReports2WithLocations!!");
        console.log("%clocation = ", "color: gray; font-size: x-large");
        console.log(location);
        // console.log("%cprevLocation = ", "color: gray; font-size: x-large");
        // console.log(prevLocation);

        // if (this.props.location !== prevProps.location) {
        //     // if (location.pathname !== "/login" && location.pathname !== "/logout") {
        //         this.setState({
        //             prevLocation: this.state.location,
        //             location: location
        //
        //         });
        //     // } else {
        //         this.setState({
        //             location: location
        //         });
        //     // }
        // }
    }

    updateDBReports(status, formIsOpen) {
        console.log("Inside updateDBReports!!");
        console.log("%cstatus = ", "color: gray; font-size: x-large");
        console.log(status);
        console.log("%cformIsOpen = ", "color: gray; font-size: x-large");
        console.log(formIsOpen);

        this.setState({
            status: status,
            formIsOpen: formIsOpen
        });
    }

    updateDBReportsFormData(isSubmitted) {
        console.log("Inside updateDBReportsFormData()s!!");
        console.log("%cisSubitted = ", "color: gray; font-size: x-large");
        console.log(isSubmitted);

        this.setState({
            formIsSubmitted: isSubmitted
        });
    }



    updateDBReportsWithId(id, sidenav) {
        var sidenav = [];
        console.log("Inside DBreports2 updateDBReportsWithId!!");
        console.log("%cid = ", "color: gray; font-size: x-large");
        console.log(id);

        // sidenav = this.state.ids.map((val) => {
        //     console.log("val = ");
        //     console.log(val);
        //     var route = "/dbreports/week/" + val["id"];
        //     var item = "Week" + val["id"];
        //     // return val["id"];
        //     return [route, item];
        // });
        sidenav = this.createSidenav(this.state.ids);
        console.log("sidenav = ");
        console.log(sidenav);

        var route = "/dbreports/week/" + id;
        var item = "Week" + id;

        sidenav.push([route, item]);



        if (id !== this.state.id ) {
            this.setState({
                id: id,
                ids: sidenav
            });
        }
    }


    updateDBReportsWithIds(id) {
        console.log("Inside DBreports2 updateDBReportsWithIds!!");
        console.log("%cid = ", "color: gray; font-size: x-large");
        console.log(id);

        // sidenav = this.state.ids.map((val) => {
        //     console.log("val = ");
        //     console.log(val);
        //     var route = "/dbreports2/week/" + val[0];
        //     var item = "Week" + val[0];
        //     // return val["id"];
        //     return [route, item];
        // });
        sidenav = this.state.ids;
        console.log("sidenav = ");
        console.log(sidenav);

        var route = "/dbreports/week/" + id;
        var item = "Week" + id;

        sidenav.push([route, item]);

        this.setState({
            ids: sidenav
        });
    }


    render() {
        console.log("this.state.formIsSubmitted = ");
        console.log(this.state.formIsSubmitted);
        if (this.state.formIsOpen) {
            return (
                <main className={this.mainClass.indexOf("/") !== -1 ? this.mainClass2 : this.mainClass }>
                    <Sidebar sidenav={this.state.ids} toggleView={this.toggleView} status={this.props.status}/>
                    <div className="outer-wrap outer-wrap-article">
                        <div className="inner-wrap inner-wrap-article">
                            <article className="article">
                                <h1>DBReports2</h1>
                                <p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>
                                <div className="description">{ description }</div>
                                <Modal class={this.state.formIsSubmitted ? "" : " hidden" } token={this.props.token} updateDBReportsWithId={this.updateDBReportsWithId}  updateDBReportsWithIds={this.updateDBReportsWithIds} updateDBreports={this.updateDBreports} formIsOpen={this.state.formIsOpen} toggleView={this.toggleView} updateDBReportsFormData={this.updateDBReportsFormData}/>
                                <div>Choose report to create or edit from dropdown list</div>
                                <FormReport2 class={this.state.formIsOpen ? "" : " hidden" } token={this.props.token} updateDBReportsWithId={this.updateDBReportsWithId}  updateDBReportsWithIds={this.updateDBReportsWithIds} updateDBreports={this.updateDBreports} formIsOpen={this.state.formIsOpen} toggleView={this.toggleView} updateDBReportsFormData={this.updateDBReportsFormData}/>
                            </article>
                        </div>
                    </div>
                </main>
            );
        } else {
            return (
                <main className={this.mainClass.indexOf("/") !== -1 ? this.mainClass2 : this.mainClass }>
                    <Sidebar sidenav={this.state.ids} toggleView={this.toggleView} status={this.props.status}/>
                    <DBReport id={this.state.id} location={this.props.location} updateDBReportsWithId={this.updateDBReportsWithId} updateDBReports2WithLocations={this.updateDBReports2WithLocations} />
                    { console.log("this.props.location in DBReports2 = ") }
                    { console.log(this.props.location) }
                </main>
            );
        }

    }
};


export default DBReports2;
