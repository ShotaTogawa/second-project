import React, { Component } from "react";
import classes from "./timeline.css";
import { Form, TextArea, Feed, Button } from "semantic-ui-react";

class TimeLine extends Component {
  render() {
    return (
      <div>
        <div className="HomeTitle" style={classes.HomeTitle}>
          <h2>Home</h2>
        </div>
        <div className="HomePostForm" style={classes.HomePostForm}>
          <Form>
            <Form.Field
              control={TextArea}
              label="Your commit"
              placeholder="Tell us more about you..."
            />
          </Form>
        </div>
        <div className="HomeTimeLine">
          <Feed>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
            <Feed.Event
              image="/images/avatar/small/elliot.jpg"
              content="You added Elliot Fu to the group Coworkers"
            />
            <Button color="blue" floated="right" size="mini">
              Result
            </Button>
            <Button color="teal" floated="right" size="mini">
              Update
            </Button>
          </Feed>
        </div>
      </div>
    );
  }
}

export default TimeLine;
