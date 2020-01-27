import React, { Component } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import classes from "../Post/tweet.css";
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { GET_RESULT, ADD_RESULT } from "../../queries";
import Loading from "../Loading";
import Error from "../Error";

class ResultForm extends Component {
  state = {
    description: "",
    done: false,
    image: ""
  };
  handleTweetChange = event => {
    const newContent = event.editor.getData();
    this.setState({ description: newContent });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateCach = (cache, { data: { addResult } }) => {
    const { getResult } = cache.readQuery({ query: GET_RESULT });
    cache.writeQuery({
      query: GET_RESULT,
      data: {
        getResult: getResult.concat([addResult])
      }
    });
  };

  handleSubmit = (event, addResult) => {
    event.preventDefault();
    addResult()
      .then(({ data }) => {
        this.props.history.push(`/${data.addResult.tweetId}`);
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { description, done, image } = this.state;
    const { _id } = this.props.session.getCurrentUser;
    return (
      <div className="TweetPostForm" style={classes.TweetPostForm}>
        <h2>Tweet</h2>
        <Mutation
          mutation={ADD_RESULT}
          variables={{
            userId: _id,
            tweetId: this.props.match.params.tweetId,
            description,
            done,
            image
          }}
          //   refetchQueries={() => [{ query: GET_RESULT }]}
          //   update={this.updateCach}
        >
          {(addResult, { data, loading, error }) => {
            if (loading) return <Loading />;
            return (
              <>
                <Form onSubmit={event => this.handleSubmit(event, addResult)}>
                  <CKEditor
                    name="description"
                    content={description}
                    events={{ change: this.handleTweetChange }}
                  />
                  <Form.Field
                    control={Checkbox}
                    label="Are you done this commit?"
                    onClick={() => this.setState({ done: !done })}
                  />
                  <Button size="tiny" color="twitter">
                    Post
                  </Button>
                </Form>
                {error && <Error error={error} />}
              </>
            );
          }}
        </Mutation>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(ResultForm);
