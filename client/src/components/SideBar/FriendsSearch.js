import React, { Component } from "react";
import { Search, List } from "semantic-ui-react";
import classes from "./sidebar.css";

class FriendSearch extends Component {
  render() {
    return (
      <>
        <div className="FriendsList" style={classes.FriendsList}>
          <Search />
          <List divided relaxed width="10">
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
      </>
    );
  }
}

export default FriendSearch;
