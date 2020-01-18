import React, { Component } from "react";
import classes from "./App.css";
import TimeLine from "./TimeLine/TimeLine";
import FriendsSearch from "./SideBar/FriendsSearch";
import Top from "./Top/Top";
import { withRouter } from "react-router-dom";

class App extends Component {
  authTop = () => (
    <div className="AppContainer" stype={classes.AppContainer}>
      <div className="SideContainer" style={classes.SideContainer}>
        <FriendsSearch />
      </div>
      <div className="TimeLineContainer" style={classes.TimeLineContainer}>
        <TimeLine />
      </div>
    </div>
  );

  unAuthTop = () => <div>Top</div>;

  render() {
    console.log(this.props.session);
    return (
      <>
        {this.props.session && this.props.session.getCurrentUser ? (
          this.authTop()
        ) : (
          <Top />
        )}
      </>
    );
  }
}

export default withRouter(App);
