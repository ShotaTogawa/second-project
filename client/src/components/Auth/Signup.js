import React, { Component, Fragment } from "react";
import classes from "./form.css";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { SIGNUP_USER } from "../../queries";
import Error from "../Error";
import Loading from "../Loading";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  errorMessage: ""
};

class Signup extends Component {
  state = {
    ...initialState
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = () => {
    const { name, email, password, passwordConfirmation } = this.state;
    if ((name, email, password, passwordConfirmation)) return true;
    return false;
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser()
      .then(async ({ data }) => {
        localStorage.setItem("token", data.signupUser.token);
        await this.props.refetch;
        this.clearState();
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      errorMessage
    } = this.state;
    return (
      <div className="FormContainer" style={classes.FormContainer}>
        <div className="FormBox" style={classes.FormBox}>
          <div>
            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              Signup
            </h2>
          </div>
          <Mutation
            mutation={SIGNUP_USER}
            variables={{ name, email, password }}
          >
            {(signupUser, { data, loading, error }) => {
              if (loading) return <Loading />;
              return (
                <Fragment>
                  <Form
                    onSubmit={event => this.handleSubmit(event, signupUser)}
                  >
                    <Form.Field width={16}>
                      <label>Name</label>
                      <input
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={16}>
                      <label>Email</label>
                      <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={16}>
                      <label>Password</label>
                      <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={16}>
                      <label>Password Confirmation</label>
                      <input
                        placeholder="Password Confirmation"
                        type="password"
                        name="passwordConfirmation"
                        onChange={this.handleChange}
                        value={passwordConfirmation}
                      />
                    </Form.Field>
                    <Button
                      size="small"
                      type="submit"
                      color="blue"
                      inverted
                      floated="right"
                      disabled={loading || !this.isFormValid()}
                    >
                      Submit
                    </Button>
                  </Form>
                  {error && <Error error={error} />}
                </Fragment>
              );
            }}
          </Mutation>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/signin">Already signup?</Link> or{" "}
            <Link to="/">Go to top?</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
