import React, { Component } from "react";
import { Search, List } from "semantic-ui-react";
import classes from "./friends.css";

class Friends extends Component {
  render() {
    return (
      <div>
        <div className="FriendsSearch" style={classes.FriendsSearch}>
          <Search />
        </div>
        <div className="FriendsList" style={classes.FriendsList}>
          <List divided relaxed>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">Semantic-Org</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">Semantic-Org-Docs</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">Semantic-Org-Meteor</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </div>
      </div>
    );
  }
}

export default Friends;
