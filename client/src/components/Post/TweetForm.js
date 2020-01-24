import React, { Component } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import classes from "./tweet.css";
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { POST_TWEET, GET_PUBLIC_TWEETS } from "../../queries";
import Loading from "../Loading";
import Error from "../Error";

class TweetForm extends Component {
  state = {
    tweet: "",
    isPublic: false,
    tag: "",
    title: ""
  };
  handleTweetChange = event => {
    const newContent = event.editor.getData();
    this.setState({ tweet: newContent });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateCach = (cache, { data: { postTweet } }) => {
    const { getPublicTweets } = cache.readQuery({ query: GET_PUBLIC_TWEETS });
    cache.writeQuery({
      query: GET_PUBLIC_TWEETS,
      data: {
        getPublicTweets: getPublicTweets.concat([postTweet])
      }
    });
  };

  handleSubmit = (event, postTweet) => {
    event.preventDefault();
    postTweet()
      .then(({ data }) => {
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { title, tweet, tag, isPublic } = this.state;
    const { _id } = this.props.session.getCurrentUser;
    return (
      <div className="TweetPostForm" style={classes.TweetPostForm}>
        <h2>Tweet</h2>
        <Mutation
          mutation={POST_TWEET}
          variables={{ userId: _id, title, tweet, tag, public: isPublic }}
          refetchQueries={() => [{ query: GET_PUBLIC_TWEETS }]}
          update={this.updateCach}
        >
          {(postTweet, { data, loading, error }) => {
            if (loading) return <Loading />;
            return (
              <>
                <Form onSubmit={event => this.handleSubmit(event, postTweet)}>
                  <Form.Field width="10">
                    <label>Title</label>
                    <input
                      placeholder="Title (Date is entered by default)"
                      onChange={this.handleChange}
                      name="title"
                      value={this.state.title}
                    />
                  </Form.Field>
                  <CKEditor
                    name="tweet"
                    content={this.state.tweet}
                    events={{ change: this.handleTweetChange }}
                  />
                  <Form.Field width="5">
                    <label>Tag</label>
                    <input
                      placeholder="Tag"
                      onChange={this.handleChange}
                      name="tag"
                      value={this.state.tag}
                    />
                  </Form.Field>
                  <Form.Field
                    control={Checkbox}
                    label="Do you want to post in public?"
                    onClick={e =>
                      this.setState({ isPublic: !this.state.isPublic })
                    }
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

export default withRouter(TweetForm);
