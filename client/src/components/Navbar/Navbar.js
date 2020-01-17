import React, { Component, Fragment } from "react";
import classes from "./navbar.css";
import { Link, withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";

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
        <ApolloConsumer>
          {client => {
            return (
              <li
                className="NavbarItem"
                style={classes.NavbarItem}
                onClick={() => this.handleSignout(client)}
              >
                <Link to="/signup" style={{ color: "#fff" }}>
                  Signout
                </Link>
              </li>
            );
          }}
        </ApolloConsumer>
      </ul>
    </Fragment>
  );

  handleSignout = client => {
    localStorage.removeItem("token");
    client.resetStore();
    this.props.history.push("/mypage");
  };

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
        {localStorage.getItem("token")
          ? this.renderNavbarAuth()
          : this.renderNavbarUnauth()}
      </nav>
    );
  }
}

export default withRouter(Navbar);
