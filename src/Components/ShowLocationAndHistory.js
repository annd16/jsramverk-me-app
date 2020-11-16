import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// A simple component that shows the pathname of the current location
class ShowLocationAndHistory extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { match, location, history } = this.props;

    return (
        <div>
            <div>You are now at {location.pathname}</div>
            <div>The properties of the history object:</div>
            <div>{history.length}</div>
            <div>{history.action}</div>
            <div>{history.location.pathname}</div>
        </div>
    );
  }
}

// // Create a new component that is "connected" (to borrow redux
// // terminology) to the router.
// const ShowTheLocationWithRouter = withRouter(ShowTheLocation);

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
export default withRouter(ShowLocationAndHistory);
