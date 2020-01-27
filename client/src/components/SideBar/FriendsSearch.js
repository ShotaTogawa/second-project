import React, { Component } from "react";
import { Search, List, Image } from "semantic-ui-react";
import classes from "./sidebar.css";
import { Link } from "react-router-dom";

class FriendSearch extends Component {
  renderFriends = () => {
    return this.props.friends.map(friend => {
      return (
        <List.Item key={friend._id}>
          <Image avatar src={friend.avatar} />
          <List.Content verticalAlign="middle">
            <Link to={`user/${friend._id}`}>
              <List.Header as="a">{friend.name}</List.Header>
            </Link>
          </List.Content>
        </List.Item>
      );
    });
  };

  render() {
    return (
      <>
        <div className="FriendsList" style={classes.FriendsList}>
          <Search />
          <h3>Friends</h3>
          <List divided relaxed width="10">
            {this.renderFriends()}
          </List>
        </div>
      </>
    );
  }
}

export default FriendSearch;
