import React, { Component } from "react";
import classes from "../App.css";
import MenuList from "../MenuList/MenuList";
import TimeLine from "../TimeLine/TimeLine";
import Friends from "../Friends/Friends";

class MyPage extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default MyPage;
