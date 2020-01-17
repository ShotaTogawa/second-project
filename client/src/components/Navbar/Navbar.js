import React, { Component, Fragment } from "react";
import classes from "./navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  renderNavbarAuth = () => (
    <Fragment>
      <ul className="NavbarList" style={classes.NavbarList}>
        <li className="NavbarItem" style={classes.NavbarItem}>
          Home
        </li>
        <li className="NavbarItem" style={classes.NavbarItem}>
          UserName
        </li>
        <li className="NavbarItem" style={classes.NavbarItem}>
          Signout
        </li>
      </ul>
    </Fragment>
  );

  renderNavbarUnauth = () => (
    <Fragment>
      <Fragment>
        <ul className="NavbarList" style={classes.NavbarList}>
          <li className="NavbarItem" style={classes.NavbarItem}>
            <Link to="/" style={{ color: "#fff" }}>
              Home
            </Link>
          </li>
          <li className="NavbarItem" style={classes.NavbarItem}>
            <Link to="/signin" style={{ color: "#fff" }}>
              Signin
            </Link>
          </li>
          <li className="NavbarItem" style={classes.NavbarItem}>
            <Link to="/signup" style={{ color: "#fff" }}>
              Signup
            </Link>
          </li>
        </ul>
      </Fragment>
    </Fragment>
  );

  render() {
    return (
      <nav className="NavbarContainer" style={classes.NavbarContainer}>
        {this.renderNavbarUnauth()}
      </nav>
    );
  }
}

export default Navbar;
