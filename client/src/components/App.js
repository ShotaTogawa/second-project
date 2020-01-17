import React, { Component } from "react";
import classes from "./App.css";
import MenuList from "./MenuList/MenuList";
import TimeLine from "./TimeLine/TimeLine";
import Friends from "./Friends/Friends";
import { withRouter } from "react-router-dom";

class App extends Component {
  authTop = () => (
    <div className="AppContainer" stype={classes.AppContainer}>
      <div className="MenuContainer" style={classes.MenuContainer}>
        <MenuList />
      </div>
      <div className="TimeLineContainer" style={classes.TimeLineContainer}>
        <TimeLine />
      </div>
      <div className="FriendsContainer" style={classes.FriendsContainer}>
        <Friends />
      </div>
    </div>
  );

  unAuthTop = () => <div>Top</div>;

  render() {
    console.log(this.props.session);
    return <>{this.props.session ? this.authTop() : this.unAuthTop()}</>;
  }
}

export default withRouter(App);
