import React, { Component } from "react";
import classes from "./form.css";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "../Error";
import Loading from "../Loading";
import { withRouter } from "react-router-dom";

const initialState = {
  email: "",
  password: ""
};

class Signin extends Component {
  state = {
    ...initialState
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser()
      .then(async ({ data }) => {
        localStorage.setItem("token", data.signinUser.token);
        await this.props.refetch();
        this.clearState();
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="FormContainer" style={classes.FormContainer}>
        <div className="SigninFormBox" style={classes.SigninFormBox}>
          <div>
            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              Signin
            </h2>
          </div>
          <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
            {(signinUser, { data, loading, error }) => {
              if (loading) return <Loading />;
              return (
                <Form onSubmit={event => this.handleSubmit(event, signinUser)}>
                  <Form.Field width={16}>
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      value={this.state.email}
                      name="email"
                      type="email"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field width={16}>
                    <label>Password</label>
                    <input
                      placeholder="Password"
                      value={this.state.password}
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Button
                    size="small"
                    type="submit"
                    color="blue"
                    inverted
                    floated="right"
                  >
                    Submit
                  </Button>
                  {error && <Error error={error} />}
                </Form>
              );
            }}
          </Mutation>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/signin">Not signup?</Link> or{" "}
            <Link to="/">Go to top?</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
