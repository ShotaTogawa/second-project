import React, { Component } from "react";
import classes from "./form.css";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Signup extends Component {
  render() {
    return (
      <div className="FormContainer" style={classes.FormContainer}>
        <div className="FormBox" style={classes.FormBox}>
          <div>
            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              Signup
            </h2>
          </div>
          <Form>
            <Form.Field width={16}>
              <label>Name</label>
              <input placeholder="First Name" />
            </Form.Field>
            <Form.Field width={16}>
              <label>Email</label>
              <input placeholder="First Name" />
            </Form.Field>
            <Form.Field width={16}>
              <label>Password</label>
              <input placeholder="Last Name" />
            </Form.Field>
            <Form.Field width={16}>
              <label>Password Confirmation</label>
              <input placeholder="Last Name" />
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
          </Form>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/signin">Already signup?</Link> or{" "}
            <Link to="/">Go to top?</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
