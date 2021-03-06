import React from 'react';

import mepic from './css/me-cropped.png';
import Sidebar from './Components/Sidebar.js'

import ShowLocationAndHistory from './Components/ShowLocationAndHistory.js';

const sidenav = [
    ["", ""],
]


class Me extends React.Component {

    constructor(props) {
        super(props);
        console.log("props in Me-constructor = ");
        console.log(props);
    }

    componentDidMount() {
        console.log("%ccomponentDidMount - Me!!", "color: purple; font-size: x-large");
        console.log("this.props = ");
        console.log(this.props);
        // One has to set state in componentDidMount otherwise this.props.xxxx will be undefined!!
        // this.setState({location: this.props.location});
        this.props.updateLayoutWithLocations(this.props.location);



    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate - Me!!");
            // prevProps is the props BEFORE update
            if (prevProps.location.pathname !== this.props.location.pathname) {
                console.log("Location has been changed in Me componentDidUpdate()");
            }

            if (prevProps.prevLocation.pathname !== this.props.prevLocation.pathname) {
                console.log("prevLocation has been changed in Me componentDidUpdate()");
            }
    }

    render() {

        console.log("this.props in Me render = ");
        console.log(this.props);
        console.log("this.props.history in Me render = ");
        console.log(this.props.history);
        console.log("this.props.location in Me render = ");
        console.log(this.props.location);

        const description = "This is my me-webpage in the programming course 'jsramverk'.\n" +
        "My name is Anna and I live in Stockholm. At the moment I'm learning how to program for the webb at BTH, " +
        "and this is something that I enjoy very much.";
        return (
            <main className="main me">
                <Sidebar sidenav={sidenav}/>
                <div className="outer-wrap outer-wrap-article">
                    <ShowLocationAndHistory/>
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
                            <div className="text-wrap">
                                <p className='text'>{ description }</p>
                            </div>
                        </article>
                    </div>
                </div>
            </main>
        );
    };
}

export default Me;
