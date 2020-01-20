import React, { Component } from "react";
import classes from "./result.css";
// import { Image } from "semantic-ui-react";
// import { Query } from "react-apollo";
// import { GET_TWEET } from "../../queries";
import { withRouter } from "react-router-dom";
// import Loading from "../Loading";
// import Error from "../Error";

class Result extends Component {
  render() {
    return (
      <div>Result</div>
      //   <Query
      //     query={GET_TWEET}
      //     variables={{ _id: this.props.match.params.resultId }}
      //   >
      // {({ data, loading, error }) => {
      //   if (loading) return <Loading />;
      //   if (error) return <Error error={error} />;
      //   console.log(data);
      //   return (
      //     <div className="ResultContainer" style={classes.ResultContainer}>
      //       <div className="ImageBox" style={classes.ImageBox}>
      //         <Image
      //           src="https://react.semantic-ui.com/images/wireframe/image.png"
      //           size="medium"
      //         />
      //       </div>
      //       <div className="ResultBox" style={classes.ResultBox}>
      //         aaa
      //       </div>
      //     </div>
      //   );
      // }}
      //   </Query>
    );
  }
}

export default withRouter(Result);
