import React, { Component, Fragment } from "react";
import classes from "./timeline.css";
import { Feed, Button, Icon } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";
import Loading from "../Loading";
import {
  GET_PUBLIC_TWEETS,
  DELETE_TWEET,
  GET_CURRENT_USER
} from "../../queries";
import { withRouter, Link } from "react-router-dom";

class TimeLine extends Component {
  handleDelete = (event, deleteTweet) => {
    event.preventDefault();
    deleteTweet()
      .then(async () => {
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div>
        <div className="HomeTitle" style={classes.HomeTitle}>
          <h2>Trails</h2>
        </div>
        {/* <TweetForm /> */}
        <div className="HomeTimeLine">
          <Feed>
            <Query query={GET_PUBLIC_TWEETS}>
              {({ data, loading, error }) => {
                if (loading) return <Loading />;
                return data.getPublicTweets.map(tweet => {
                  return (
                    <Fragment key={tweet._id}>
                      <Feed.Event>
                        <Feed.Label>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGKHemZfIsHqDZM3k7tXRYLknh5yOFXYBeZpP9tpvKftKJvIkz" />
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary>
                            <div
                              dangerouslySetInnerHTML={{ __html: tweet.tweet }}
                            />
                            <Feed.Like style={{ marginRight: "0.7rem" }}>
                              <Icon name="like" />
                              {tweet.likes}
                            </Feed.Like>
                            <Feed.Meta>
                              {tweet.tag ? (
                                <div className="Tag" style={classes.Tag}>
                                  {tweet.tag}
                                </div>
                              ) : (
                                ""
                              )}
                            </Feed.Meta>
                            <Feed.Date>1 Hour Ago</Feed.Date>
                          </Feed.Summary>
                        </Feed.Content>
                        <Feed.Meta>
                          {this.props.userId !== tweet.userId ? (
                            <>
                              <Mutation
                                mutation={DELETE_TWEET}
                                variables={{ _id: tweet._id }}
                                refetchQueries={() => [
                                  { query: GET_PUBLIC_TWEETS },
                                  { query: GET_CURRENT_USER }
                                ]}
                              >
                                {(deleteTweet, { data, loading, error }) => {
                                  if (loading) return <Loading />;
                                  return (
                                    <Button
                                      color="red"
                                      floated="right"
                                      size="mini"
                                      circular
                                      icon="delete"
                                      onClick={event =>
                                        this.handleDelete(event, deleteTweet)
                                      }
                                    />
                                  );
                                }}
                              </Mutation>
                              <Link to={`/post/edit/${tweet._id}`}>
                                <Button
                                  color="teal"
                                  floated="right"
                                  size="mini"
                                  circular
                                  icon="edit"
                                />
                              </Link>
                              <Link to={`/result/${tweet._id}`}>
                                <Button
                                  color="olive"
                                  floated="right"
                                  size="mini"
                                  circular
                                >
                                  Result
                                </Button>
                              </Link>
                              <Link to={`/result/update/${tweet._id}`}>
                                <Button
                                  color="olive"
                                  floated="right"
                                  size="mini"
                                  circular
                                >
                                  Add Result
                                </Button>
                              </Link>
                            </>
                          ) : (
                            ""
                          )}
                        </Feed.Meta>
                      </Feed.Event>
                    </Fragment>
                  );
                });
              }}
            </Query>
          </Feed>
        </div>
      </div>
    );
  }
}

export default withRouter(TimeLine);
