import React from 'react';

import mepic from './css/me-cropped.png';
import Sidebar from './Components/Sidebar.js'

const sidenav = [
    ["", ""],
]


class Me extends React.Component {

    render() {

        const description = "This is my me-webpage in the programming course 'jsramverk'.\n" +
        "My name is Anna and I live in Stockholm. At the moment I'm learning how to program for the webb at BTH, " +
        "and this is something that I enjoy very much.";
        return (
            <main className="main me">
                <Sidebar sidenav={sidenav}/>
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
