
import React from 'react';

const port = 1337;

class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log("%cprops in Table: ", "color: orange; font-size: large");
        console.log(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            pwIsVisible: false,
            tableIsVisible: false,
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.showPW = this.showPW.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount() in Table_users");
        console.log("this.props.dataFromParent = ");
        console.log(this.props.dataFromParent);
    }


    // handleChange(event) {
    //     // event.preventDefault();
    //     console.log("%cA change-event has happened!", "color: purple; font-size: x-large");
    //     const target = event.target;
    //     // const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const value = target.value;
    //     const name = target.name;
    //
    //     console.log("name = " + name);
    //     console.log("value = " + value);
    //
    //     this.setState({
    //         [name]: value
    //     });
    // }


    // handleClick(event) {
    //     // event.preventDefault();
    //     // event.stopPropagation();
    //     // event.nativeEvent.stopImmediatePropagation();
    //     console.log("%cA click-event has happened!", "color: purple; font-size: x-large");
    //     this.toggleDatePicker();
    //     console.log("this in Form handleClick()");
    //     console.log(this);
    // }
    //
    // handleClick2(event) {
    //     // event.preventDefault();      // Doesn't work if this is uncommented
    //     event.stopPropagation();
    //     event.nativeEvent.stopImmediatePropagation();
    //     console.log("%cA click2-event has happened!", "color: purple; font-size: x-large");
    //     console.log("The gdpr box has been clicked!");
    //     console.log("this in Form handleClick2()");
    //     console.log(this);
    //
    // }
    //
    // showPW() {
    //     if (!this.state.pwIsVisible) {
    //         this.setState({pwIsVisible: true});
    //         this.timeout = setTimeout(() => {
    //             this.setState({pwIsVisible: false});
    //         }, 1000);
    //     }
    // }

    render() {

        const { tableIsVisible } = this.state;
        console.log("TableUser has been rendered!!!");
        console.log("this.props.dataFromParent = ");
        console.log(this.props.dataFromParent);
        if (Array.isArray(this.props.dataFromParent) && this.props.dataFromParent.length ) {
            return (
                 <table className={"table user " + this.props.cssClass}>
                    <tr className="tr">
                        <th className="th">{"Name"}</th>
                        <th className="th">{"Email"}</th>
                        <th className="th">{"Password"}</th>
                    </tr>

                    {this.props.dataFromParent.map((row, index) => {
                        return (<tr className="tr" key={index}>         {/* Not so good to have index here according to React docs...*/}
                            <td className="td">{row.name ? row.name : ""}</td>
                            <td className="td">{row.email ? row.email : ""}</td>
                            <td className="td">{row.password ? row.password : ""}</td>
                        </tr>)
                    })}

                </table>

            );
        } else {
            return (
                // <div className={"table.user" + (this.props.dataFromParent.email ? "" : ".hidden")}>
                // <div className={"table user" + (tableIsVisible ? "" : " hidden")}>
                 <table className={"table user " + this.props.cssClass}>
                    <tr className="tr">
                        <th className="th"> {this.props.dataFromParent}</th>
                    </tr>
                </table>

            );
        }

    }
}

export default Table;
