import React, { Component } from "react";
import classes from "./timeline.css";
import { Feed, Button } from "semantic-ui-react";
// import TweetForm from "../SideBar.js/TweetForm";

class TimeLine extends Component {
  render() {
    return (
      <div>
        <div className="HomeTitle" style={classes.HomeTitle}>
          <h2>Trails</h2>
        </div>
        {/* <TweetForm /> */}
        <div className="HomeTimeLine">
          <Feed>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="red" floated="right" size="mini">
              Delete
            </Button>
            <Button color="teal" floated="right" size="mini">
              Edit
            </Button>
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
          </Feed>
        </div>
      </div>
    );
  }
}

export default TimeLine;
