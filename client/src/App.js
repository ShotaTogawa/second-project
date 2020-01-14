import React from "react";
import classes from "./App.css";
import MenuList from "./components/MenuList/MenuList";
import TimeLine from "./components/TimeLine/TimeLine";
import Friends from "./components/Friends/Friends";

const App = () => {
  return (
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
};

export default App;
