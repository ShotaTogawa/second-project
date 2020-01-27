import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { UNLIKE_TWEET, GET_CURRENT_USER } from "../../queries";
import WithSession from "../WithSession";

class FabCard extends Component {
  handleClick = unlikeTweet => {
    unlikeTweet().then(async ({ data }) => {
      await this.props.refetch();
    });
  };

  render() {
    const { userId, fab } = this.props;
    return (
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="/images/avatar/large/steve.jpg"
          />
          <Card.Header>{fab.title}</Card.Header>
          <Card.Meta>{fab.likes} likes</Card.Meta>
          <Card.Description>tag: {fab.tag}</Card.Description>
        </Card.Content>
        <Card.Content>
          <div className="ui two buttons">
            <Button basic color="green">
              <Link to={`/${fab._id}`}>Detail</Link>
            </Button>
            <Mutation
              mutation={UNLIKE_TWEET}
              variables={{ _id: fab._id, userId }}
            >
              {unlikeTweet => (
                <Button
                  basic
                  color="red"
                  onClick={() => this.handleClick(unlikeTweet)}
                >
                  Untrack
                </Button>
              )}
            </Mutation>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default WithSession(withRouter(FabCard));
