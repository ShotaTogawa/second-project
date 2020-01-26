import React, { Component, Fragment } from "react";
import classes from "./timeline.css";
import { Feed, Button, Icon } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";
import Loading from "../Loading";
import Comments from "../Comment/Comments";
import LikeTweet from "./LikeTweet";
import {
  GET_PUBLIC_TWEETS,
  DELETE_TWEET,
  GET_CURRENT_USER,
  GET_COMMENTS
} from "../../queries";
import { withRouter, Link } from "react-router-dom";

class TimeLine extends Component {
  state = {
    isOpen: false
  };
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
                            <Link to={`/user/${tweet.userId}`}>
                              {tweet.user.name}{" "}
                            </Link>{" "}
                            added "{tweet.title}"
                          </Feed.Summary>
                          <Feed.Extra text>
                            {!this.state.isOpen ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: tweet.tweet.slice(0, 200)
                                }}
                              />
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: tweet.tweet
                                }}
                              />
                            )}
                            {tweet.tweet.length > 200 && !this.state.isOpen ? (
                              <span
                                style={{
                                  color: "#4183C4",
                                  borderBottom: "1px solid #4183C4",
                                  cursor: "pointer",
                                  paddingTop: "1rem"
                                }}
                                onClick={() => this.setState({ isOpen: true })}
                              >
                                ... read more
                              </span>
                            ) : tweet.tweet.length > 200 &&
                              this.state.isOpen ? (
                              <span
                                style={{
                                  color: "#4183C4",
                                  cursor: "pointer",
                                  paddingTop: "1rem"
                                }}
                                onClick={() => this.setState({ isOpen: false })}
                              >
                                X
                              </span>
                            ) : (
                              ""
                            )}
                          </Feed.Extra>
                          {this.props.userId === tweet.userId ? (
                            ""
                          ) : (
                            <LikeTweet
                              _id={tweet._id}
                              userId={this.props.userId}
                            />
                          )}
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
                        </Feed.Content>
                        <Feed.Meta>
                          {this.props.userId === tweet.userId ? (
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
                            </>
                          ) : (
                            ""
                          )}
                          {tweet.resultId ? (
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
                          ) : !tweet.resultId &&
                            tweet.userId === this.props.userId ? (
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
                          ) : (
                            ""
                          )}
                        </Feed.Meta>
                      </Feed.Event>
                      <Query
                        query={GET_COMMENTS}
                        variables={{ tweetId: tweet._id }}
                      >
                        {({ data, loading, error }) => {
                          if (loading) return <Loading />;
                          return (
                            <Comments
                              userId={this.props.userId}
                              tweetId={tweet._id}
                              push={this.props.history.push}
                              comments={data.getComments}
                            />
                          );
                        }}
                      </Query>
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
