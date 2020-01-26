import React, { Component } from "react";
import classes from "./mypage.css";
import { Image, Table, Button } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_TWEETS, GET_USER } from "../../queries";
import Loading from "../Loading";

class UserPage extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <div className="MyPageContainer">
          <div className="ProfileContainer">
            <Query
              query={GET_USER}
              variables={{ _id: this.props.match.params.userId }}
            >
              {({ data, loading, error }) => {
                if (loading) return <Loading />;
                return (
                  <>
                    <div className="ProfileImage">
                      <Image
                        // {data.getUser.avatar}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNvNK0vdBneJz5FHoIggrA7UruNCVKsTfUxixvlA6KOMn3xd0J"
                        size="medium"
                      />
                      {data.getUser._id ===
                      this.props.session.getCurrentUser._id
                        ? ""
                        : "Follow"}
                    </div>
                    <div className="ProfileInfo" style={classes.ProfileInfo}>
                      <h2>{data.getUser.name}</h2>
                    </div>
                  </>
                );
              }}
            </Query>
          </div>
        </div>
        <div className="OwnTrailContainer">
          {/* <div className="SortSection" style={classes.SortSection}>
            tag and hiduke
            <p>koko</p>
          </div> */}
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
                        <Link to="#">{tweet.title}</Link>
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
