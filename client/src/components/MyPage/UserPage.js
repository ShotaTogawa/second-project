import React, { Component } from "react";
import classes from "./userpage.css";
import { Image, Table, Button } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_TWEETS, GET_USER } from "../../queries";
import Loading from "../Loading";
import FollowFriends from "./FollowFrined";

class UserPage extends Component {
  render() {
    return (
      <>
        <div className="UserPageContainer">
          <Query
            query={GET_USER}
            variables={{ _id: this.props.match.params.userId }}
          >
            {({ data, loading, error }) => {
              if (loading) return <Loading />;
              console.log(error);
              return (
                <div className="UserProfileContainer">
                  <div className="UserProfileImage">
                    <Image
                      // {data.getUser.avatar}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNvNK0vdBneJz5FHoIggrA7UruNCVKsTfUxixvlA6KOMn3xd0J"
                      size="medium"
                    />
                  </div>
                  <div
                    className="FollowButtonContainer"
                    style={classes.FollowButtonContainer}
                  >
                    <FollowFriends friendId={this.props.match.params.userId} />
                  </div>
                  <div className="UserProfileInfo" style={classes.ProfileInfo}>
                    <h2>{data.getUser.name}</h2>
                  </div>
                </div>
              );
            }}
          </Query>
        </div>
        <div className="UserTrailContainer">
          <Table color="teal">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>tag</Table.HeaderCell>
                <Table.HeaderCell>Likes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Query
                query={GET_TWEETS}
                variables={{ userId: this.props.match.params.userId }}
              >
                {({ data, loading, error }) => {
                  if (loading) return <Loading />;
                  return data.getTweets.map(tweet => (
                    <Table.Row key={tweet._id}>
                      <Table.Cell>{tweet.image}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/${tweet._id}`}>{tweet.title}</Link>
                      </Table.Cell>
                      <Table.Cell>{tweet.tag}</Table.Cell>
                      <Table.Cell>{tweet.likes}</Table.Cell>
                    </Table.Row>
                  ));
                }}
              </Query>
            </Table.Body>
          </Table>

          <div className="PagenationButton" style={classes.PagenationButton}>
            <Button size="mini" color="twitter" circular>
              Load more...
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(UserPage);
