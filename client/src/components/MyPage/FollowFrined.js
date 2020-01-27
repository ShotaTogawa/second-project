import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import WithSession from "../WithSession";
import { Mutation } from "react-apollo";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../queries";

class FollowFrined extends Component {
  state = {
    followed: false
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { friends } = this.props.session.getCurrentUser;
      const { friendId } = this.props;
      const alreadyFollowed =
        friends.findIndex(friend => friend._id === friendId) > -1;
      this.setState({ followed: alreadyFollowed });
    }
  }

  handleClick = (followFriend, unfollowFriend) => {
    this.setState(
      prevState => ({ followed: !prevState.followed }),
      () => this.handleLike(followFriend, unfollowFriend)
    );
  };

  handleLike = (followFriend, unfollowFriend) => {
    if (this.state.followed) {
      followFriend().then(async ({ data }) => {
        await this.props.refetch();
      });
    } else {
      unfollowFriend().then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  render() {
    const { friendId } = this.props;
    const { _id } = this.props.session.getCurrentUser;
    return (
      <Mutation mutation={UNFOLLOW_USER} variables={{ _id, friendId }}>
        {unfollowFriend => (
          <Mutation mutation={FOLLOW_USER} variables={{ _id, friendId }}>
            {followFriend => (
              <Button
                color="blue"
                size="mini"
                circular
                onClick={() => this.handleClick(followFriend, unfollowFriend)}
              >
                {this.state.followed ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default WithSession(FollowFrined);
