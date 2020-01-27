import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import classes from "./fab.css";
import WithSession from "../WithSession";
import FabCard from "./FabCard";

class FabList extends Component {
  renderCards = () => {
    const { _id, favorites } = this.props.session.getCurrentUser;
    return favorites.map(fab => {
      return <FabCard userId={_id} fab={fab} />;
    });
  };
  render() {
    return (
      <div className="FabContainer" style={classes.FabContainer}>
        <h2 style={{ textAlign: "center" }}>Favorites List</h2>
        <div className="CardContainer">
          <Card.Group>{this.renderCards()}</Card.Group>
        </div>
      </div>
    );
  }
}

export default WithSession(FabList);
