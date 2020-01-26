import React, { Component } from "react";
import { List } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import classes from "./fab.css";

class FabList extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="FabContainer" style={classes.FabContainer}>
        <h2>Favorites List</h2>
        <List divided relaxed>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">Semantic-Org/Semantic-UI</List.Header>
              <List.Description as="a">Updated 10 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">Semantic-Org/Semantic-UI-Docs</List.Header>
              <List.Description as="a">Updated 22 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as="a">Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default withRouter(FabList);
