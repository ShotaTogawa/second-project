import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import classes from "./Menu.css";

class MenuList extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div className="MenuListStyle" style={classes.MenuListStyle}>
        <Menu pointing secondary vertical>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="posts"
            active={activeItem === "posts"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="signout"
            active={activeItem === "signout"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}

export default MenuList;
