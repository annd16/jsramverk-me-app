import React from 'react';

import Sidebar from './Components/Sidebar.js'

import FormReport from './Form/Form_report.js';

const description = "This is my page for reports!";

// const sidenav = [
//     ["/report/week/1", "Week1"],
//     ["/report/week/2", "Week2"],
//     ["/report/week/3", "Week3"],
// ]

var sidenav = [];

const port = 1337;

// const cancelablePromise = makeCancelable(
//     new Promise(r => component.setState({ids: sidenav}))
// );



class DBReports extends React.Component {
    mainClass = "main " + this.props.location.pathname.slice(1);

    // A controller is created to be able to cancel the fetching in componentWillUnmount
    controller = new AbortController();

    constructor(props) {
        super(props);
        console.log(props);
        // Initialize state here
        // Should only assign directly to state here
        this.state = {
            ids: [],
            status: false,
            formIsOpen: false
        };

        this.updateDBReports = this.updateDBReports.bind(this);
    }


    toggleView = () => this.setState({formIsOpen: !this.state.formIsOpen})

    componentDidMount(event) {
        console.log("componentDidMount - DBReports!!");
        console.log("this.props = ");
        console.log(this.props);
        // One has to set state in componentDidMount otherwise this.props.xxxx will be undefined!!
        // this.setState({location: this.props.location});
        this.props.updateLayoutWithLocations(this.props.location);
        // console.log("A registration form was submitted from " + this.state.name);
        console.log("this.state = ");
        console.log(this.state);
        fetch('http://localhost:'+ port + '/dbreports', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
            signal: this.controller.signal
            // body: JSON.stringify(this.state)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("Something has been fetched!!");
            console.log("result = ");
            console.log(result);
            // Convert it to a value array:
            var anArray = Object.entries(result.data);
            console.log(anArray);
            sidenav = result.data.map((val) => {
                console.log("val = ");
                console.log(val);
                var route = "/report/week/" + val["id"];
                var item = "Week" + val["id"];
                // return val["id"];
                return [route, item];
            });
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
                console.error('An error has occured while fetching data in DBreports', err);
            }
        })
    }

    componentWillUnmount () {
        // this.cancelablePromise.cancel(); // Cancel the promise
        console.log("%cThe dbreports component will be unmounted!", "color: purple; font-size: x-large;");
        this.controller.abort();
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

    render() {
        return (
            <main className={this.mainClass}>
                <Sidebar sidenav={this.state.ids}/>
                <div className="outer-wrap outer-wrap-article">
                    <div className="inner-wrap inner-wrap-article">
                        <article className="article">
                            <h1>DBReports</h1>
                            <p className="route">( this.props.location.pathname:  { this.props.location.pathname } )</p>
                            <div className="description">{ description }</div>
                            <div>Create a new report</div>
                            <FormReport class={this.state.formIsOpen ? "" : " hidden" } updateDBreports={this.updateDBreports} formIsOpen={this.state.formIsOpen} toggleView={this.statetoggleView}/>
                        </article>
                    </div>
                </div>
            </main>
        );
    }
};


export default DBReports;
