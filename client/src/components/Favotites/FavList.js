import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import classes from "./fav.css";
import WithSession from "../WithSession";
import FavCard from "./FavCard";

class FavList extends Component {
  renderCards = () => {
    const { _id, favorites } = this.props.session.getCurrentUser;
    return favorites.map(fav => {
      return <FavCard userId={_id} fav={fav} key={fav._id} />;
    });
  };
  render() {
    return (
      <div className="FavContainer" style={classes.FavContainer}>
        <h2 style={{ textAlign: "center" }}>Favorites List</h2>
        <div className="CardContainer">
          <Card.Group>{this.renderCards()}</Card.Group>
        </div>
      </div>
    );
  }
}

export default WithSession(FavList);
