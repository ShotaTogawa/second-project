import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { GET_TWEET, GET_RESULT } from "../../queries";
import classes from "../Result/result.css";
import { Image, Feed, Icon, Button } from "semantic-ui-react";
import Error from "../Error";
import WithSession from "../WithSession";
import { get } from "mongoose";

class DetailPage extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Query
          query={GET_TWEET}
          variables={{ _id: this.props.match.params.tweetId }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            console.log(data);
            return (
              <div>
                <div
                  className="ResultContainer"
                  style={classes.ResultContainer}
                >
                  <h2 style={{ textAlign: "center", margin: "4rem 0 -2rem 0" }}>
                    Commit
                  </h2>
                  <div className="ImageBox" style={classes.ImageBox}>
                    {data.getTweet.image ? (
                      <Image src={data.getTweet.image} size="medium" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="ResultBox" style={classes.ResultBox}>
                    <h3>{data.getTweet.title}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.getTweet.tweet
                      }}
                    />
                    <Feed>
                      <Feed.Content>
                        <Feed.Meta>
                          <Feed>
                            <Icon name="like" color="red" />
                            {data.getTweet.likes} Likes
                          </Feed>
                        </Feed.Meta>
                        <Feed.Summary>
                          <Feed.Date>{data.getTweet.createdAt}</Feed.Date>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed>
                  </div>
                </div>
                {data.getTweet.resultId ? (
                  <Query
                    query={GET_RESULT}
                    variables={{ tweetId: this.props.match.params.tweetId }}
                  >
                    {({ data, loading, error }) => {
                      if (loading) return <Loading />;
                      if (error) return <Error error={error} />;
                      return (
                        <div
                          className="ResultContainer"
                          style={classes.ResultContainer}
                        >
                          <h2
                            style={{
                              textAlign: "center",
                              margin: "4rem 0 -2rem 0"
                            }}
                          >
                            Result
                          </h2>
                          <div className="ImageBox" style={classes.ImageBox}>
                            {data.getResult.image ? (
                              <Image src={data.getResult.image} size="medium" />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="ResultBox" style={classes.ResultBox}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.getResult.description
                              }}
                              style={{ marginBottom: "4rem" }}
                            />
                          </div>
                        </div>
                      );
                    }}
                  </Query>
                ) : !data.getTweet.resultId &&
                  data.getTweet.userId ===
                    this.props.session.getCurrentUser._id ? (
                  <div
                    className="ResultContainer"
                    style={classes.ResultContainer}
                  >
                    <div className="ResultBox" style={classes.ResultBox}>
                      <Link to={`/result/update/${data.getTweet._id}`}>
                        <Button color="blue" size="mini" circular>
                          Add Result
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default WithSession(DetailPage);
