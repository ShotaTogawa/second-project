import React, { Component } from "react";
import { Form, TextArea, Checkbox, Button } from "semantic-ui-react";
import classes from "./sidebar.css";
import CKEditor from "react-ckeditor-component";

class TweetForm extends Component {
  state = {
    tweet: ""
  };
  handleTweetChange = event => {
    const newContent = event.editor.getDate();
    this.setState({ tweet: newContent });
  };
  render() {
    return (
      <div className="TweetPostForm" style={classes.TweetPostForm}>
        <Form>
          {/* <Form.Field
            control={TextArea}
            label="Your commit"
            placeholder="Tell your friends your trail..."
            width="15"
          /> */}
          <CKEditor
            name="tweet"
            content={this.state.tweet}
            events={{ change: this.handleTweetChange }}
          />
          <Form.Field width="8">
            <label>Tag</label>
            <input placeholder="Tag" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Share in public?" />
          </Form.Field>
          <Button size="tiny" color="twitter">
            Post
          </Button>
        </Form>
      </div>
    );
  }
}

export default TweetForm;
