import React from 'react';
/*import { BrowserRouter as Router, Link, Route } from 'react-router-dom';*/
import { Link } from 'react-router-dom';

class Button extends React.Component {

    constructor(props) {
        super(props);
        console.log("%cprops in Button: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            mode: 'create'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("A Button-component has been clicked!");
        this.props.toggleView();
    }

    render() {
        console.log(this.props);
        return (
            <div className="button">
                {this.props.optionalComp ? this.props.optionalComp : ""}
                <button onClick={this.handleClick}>
                    Toggle between view mode and create/edit mode!
                </button>
            </div>
        )
    }
}

export default Button;
