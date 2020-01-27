import React, { Component } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import classes from "./tweet.css";
import CKEditor from "react-ckeditor-component";
import { Query, Mutation } from "react-apollo";
import Loading from "../Loading";
import { GET_TWEET, UPDATE_TWEET, GET_PUBLIC_TWEETS } from "../../queries";
import { withRouter, Link } from "react-router-dom";
import Error from "../Error";

class TweetUpdateForm extends Component {
  state = {
    updateTweet: "",
    isPublic: false,
    updateTag: ""
  };
  handleTweetChange = event => {
    const newContent = event.editor.getData();
    this.setState({ updateTweet: newContent });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateCach = (cache, { data: { editTweet } }) => {
    const { getPublicTweets } = cache.readQuery({ query: GET_PUBLIC_TWEETS });
    cache.writeQuery({
      query: GET_PUBLIC_TWEETS,
      data: {
        getPublicTweets: getPublicTweets.concat([editTweet])
      }
    });
  };

  handleSubmit = (event, editTweet) => {
    event.preventDefault();
    editTweet()
      .then(async () => {
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    return (
      <div>
        <div className="TweetPostForm" stlye={classes.TweetPostForm}>
          <Query
            query={GET_TWEET}
            variables={{ _id: this.props.match.params.id }}
          >
            {({ data, loading, error }) => {
              if (loading) return <Loading />;
              const { _id, tweet, tag } = data.getTweet;
              const { updateTweet, updateTag, isPublic } = this.state;
              return (
                <Mutation
                  mutation={UPDATE_TWEET}
                  variables={{
                    _id: _id,
                    tweet: updateTweet,
                    tag: updateTag,
                    public: isPublic
                  }}
                  refetchQueries={() => [{ query: GET_PUBLIC_TWEETS }]}
                  update={this.updateCach}
                >
                  {(editTweet, { data, loading, error }) => {
                    if (loading) return <Loading />;
                    return (
                      <>
                        <h2>Update Tweet</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<h3>Current Content:</h3> ${tweet}`
                          }}
                          style={{ marginBottom: "1.5rem" }}
                        />
                        <Form
                          onSubmit={event =>
                            this.handleSubmit(event, editTweet)
                          }
                        >
                          <CKEditor
                            name="tweet"
                            content={updateTweet}
                            events={{ change: this.handleTweetChange }}
                          />
                          <Form.Field width="5">
                            <label>Tag</label>
                            <input
                              placeholder={tag}
                              onChange={this.handleChange}
                              name="updateTag"
                              value={updateTag}
                            />
                          </Form.Field>
                          <Form.Field
                            control={Checkbox}
                            label="Do you want to post in public?"
                            onClick={e =>
                              this.setState({
                                isPublic: !isPublic
                              })
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
              );
            }}
          </Query>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(TweetUpdateForm);
