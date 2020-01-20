import React, { Component } from "react";
import classes from "./result.css";
import { Image } from "semantic-ui-react";
import { Query } from "react-apollo";
import { GET_RESULT } from "../../queries";
import { withRouter, Link } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";

class Result extends Component {
  render() {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Achievement</h2>
        <Query
          query={GET_RESULT}
          variables={{ tweetId: this.props.match.params.tweetId }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            return (
              <div className="ResultContainer" style={classes.ResultContainer}>
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
                  />
                </div>
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default withRouter(Result);
