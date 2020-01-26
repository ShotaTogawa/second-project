import React, { Component } from "react";
import classes from "./App.css";
import TimeLine from "./TimeLine/TimeLine";
import FriendsSearch from "./SideBar/FriendsSearch";
import Top from "./Top/Top";
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        {this.props.session && this.props.session.getCurrentUser ? (
          <div className="AppContainer" stype={classes.AppContainer}>
            <div className="SideContainer" style={classes.SideContainer}>
              <FriendsSearch
                friends={this.props.session.getCurrentUser.friends}
              />
            </div>
            <div
              className="TimeLineContainer"
              style={classes.TimeLineContainer}
            >
              <TimeLine userId={this.props.session.getCurrentUser._id} />
            </div>
          </div>
        ) : (
          <Top />
        )}
      </>
    );
  }
}

export default withRouter(App);
