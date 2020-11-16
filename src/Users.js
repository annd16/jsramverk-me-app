import React from 'react';

import Sidebar from './Components/Sidebar.js'
import FormDisplayUsers from './Form/Form_users.js';
import TableUsers from './Table/Table_users.js';


const sidenav = [
    ["", ""],
]


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    data: "",
                    result: "",
                    tableIsVisible: false,
                    formIsSubmitted: false,
                    rows: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateUsersWithSubmissionData = this.updateUsersWithSubmissionData.bind(this);
    }


    componentDidMount() {
        console.log("componentDidMount!");
        this.props.updateLayoutWithLocations(this.props.location);
    }

    /* This click handler is necessary to prevent the datepicker from closing when clicking outside form date input */
    handleClick(event) {
        event.preventDefault();
    }

    updateUsersWithSubmissionData(isSubmitted, rows) {
        console.log("Inside updateUsersWithSubmissionData()!!");
        console.log("%cisSubmitted = ", "color: gray; font-size: x-large");
        console.log(isSubmitted);

        if (isSubmitted) {
            var isVisible = true;
        } else {
            var isVisible = false;
        }

        this.setState({
            formIsSubmitted: isSubmitted,
            tableIsVisible: isVisible,
            rows: rows
        });
        console.log("this.state = ");
        console.log(this.state);
    }


    mainClass = "main " + this.props.location.pathname.slice(1);
    render() {
        console.log("this.props inside login render = ");
        console.log(this.props);

        const description = "Please click button below to display all users.";
        return (

            <main className={this.mainClass} onMouseUp={this.handleMouseUp}>
                <Sidebar sidenav={sidenav}/>
                <div className="outer-wrap outer-wrap-article">
                    <div className="inner-wrap inner-wrap-article">
                        <article className="article" onClick={this.handleClick}>
                            <h2>Users</h2>
                            <p className='description'>{ description }</p>
                            <FormDisplayUsers updateUsersWithSubmissionData={this.updateUsersWithSubmissionData}/>
                            <TableUsers dataFromParent={ this.state.rows.length !== 0 ? this.state.rows : "No data to display here."} cssClass={this.state.tableIsVisible ? "" : "hidden"}/>
                        </article>
                    </div>
                </div>
            </main>
        );
    };
}

export default Users;
