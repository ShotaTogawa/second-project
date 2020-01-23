import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import WithSession from "../WithSession";
import { Mutation } from "react-apollo";
import { LIKE_TWEET, UNLIKE_TWEET } from "../../queries";

class LikeTweet extends Component {
  state = {
    liked: false
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const alreadyLiked =
        favorites.findIndex(favotite => favotite._id === _id) > -1;
      this.setState({ liked: alreadyLiked });
    }
  }

  handleClick = (likeTweet, unlikeTweet) => {
    this.setState(
      prevState => ({ liked: !prevState.liked }),
      () => this.handleLike(likeTweet, unlikeTweet)
    );
  };

  handleLike = (likeTweet, unlikeTweet) => {
    if (this.state.liked) {
      likeTweet().then(async ({ data }) => {
        await this.props.refetch();
      });
    } else {
      unlikeTweet().then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  render() {
    const { _id, userId } = this.props;
    return (
      <div
        style={{
          marginTop: "0.5rem"
        }}
      >
        <Mutation mutation={UNLIKE_TWEET} variables={{ _id, userId }}>
          {unlikeTweet => (
            <Mutation mutation={LIKE_TWEET} variables={{ _id, userId }}>
              {likeTweet => (
                <Icon
                  name="like"
                  onClick={() => this.handleClick(likeTweet, unlikeTweet)}
                  color={this.state.liked ? "red" : "grey"}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      </div>
    );
  }
}

export default WithSession(LikeTweet);
