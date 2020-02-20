import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { UNLIKE_TWEET } from "../../queries";
import WithSession from "../WithSession";

class FavCard extends Component {
  handleClick = unlikeTweet => {
    unlikeTweet().then(async ({ data }) => {
      await this.props.refetch();
    });
  };

  render() {
    const { userId, fav } = this.props;
    return (
      <Card key={fav._id}>
        <Card.Content>
          {/* <Image
            floated="right"
            size="mini"
            src="/images/avatar/large/steve.jpg"
          /> */}
          <Card.Header>{fav.title}</Card.Header>
          <Card.Meta>{fav.likes} likes</Card.Meta>
          <Card.Description>tag: {fav.tag}</Card.Description>
        </Card.Content>
        <Card.Content>
          <div className="ui two buttons">
            <Button basic color="green">
              <Link to={`/${fav._id}`}>Detail</Link>
            </Button>
            <Mutation
              mutation={UNLIKE_TWEET}
              variables={{ _id: fav._id, userId }}
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

export default WithSession(withRouter(FavCard));
