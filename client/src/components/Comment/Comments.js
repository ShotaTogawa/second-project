import React, { Component } from "react";
import { Button, Comment, Form, Header, List } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { ADD_COMMENT, DELETE_COMMENT } from "../../queries";
import Loading from "../Loading";

class Comments extends Component {
  state = {
    comment: "",
    openField: false
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleDelete = (event, deleteComment) => {
    event.preventDefault();
    deleteComment()
      .then(async () => {
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  // updateCach = (cache, { data: { addComment } }) => {
  //   const { getPublicTweets } = cache.readQuery({ query: GET_PUBLIC_TWEETS });
  //   cache.writeQuery({
  //     query: GET_PUBLIC_TWEETS,
  //     data: {
  //       getPublicTweets: getPublicTweets.concat([addComment])
  //     }
  //   });
  // };

  renderComments = comments => {
    return comments.map(comment => {
      return (
        <Comment key={comment._id}>
          <Comment.Avatar src="/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author as="a">Matt</Comment.Author>
            <Comment.Metadata>
              <div>{comment.createdAt}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
            {comment.userId === this.props.userId ? (
              <List horizontal size="mini">
                {/* <List.Item as="a">Edit</List.Item> */}
                <Mutation
                  mutation={DELETE_COMMENT}
                  variables={{ _id: comment._id }}
                >
                  {(deleteComment, { data, loading, error }) => {
                    if (loading) return <Loading />;
                    return (
                      <List.Item
                        as="a"
                        onClick={event =>
                          this.handleDelete(event, deleteComment)
                        }
                      >
                        Delete
                      </List.Item>
                    );
                  }}
                </Mutation>
              </List>
            ) : (
              ""
            )}
          </Comment.Content>
        </Comment>
      );
    });
  };

  handleSubmit = (event, addComment) => {
    event.preventDefault();
    addComment()
      .then(({ data }) => {
        this.setState({ openField: false });
        this.props.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    return (
      <Comment.Group size="mini">
        <Header dividing />
        {this.renderComments(this.props.comments)}

        {this.state.openField ? (
          <Mutation
            mutation={ADD_COMMENT}
            variables={{
              userId: this.props.userId,
              tweetId: this.props.tweetId,
              comment: this.state.comment
            }}
            //   refetchQueries={() => [{ query: GET_PUBLIC_TWEETS }]}
            // update={this.updateCach}
          >
            {(addComment, { data, loading, error }) => {
              if (loading) return <Loading />;
              return (
                <Form
                  reply
                  onSubmit={event => this.handleSubmit(event, addComment)}
                >
                  <Form.Input
                    placeholder="Comment"
                    name="comment"
                    onChange={this.handleChange}
                  />
                  <Button
                    content="Comment"
                    labelPosition="left"
                    icon="edit"
                    primary
                    size="mini"
                  />
                  <Button
                    icon="delete"
                    size="mini"
                    content="close"
                    onClick={() => {
                      this.setState({ openField: false });
                    }}
                  />
                </Form>
              );
            }}
          </Mutation>
        ) : (
          ""
        )}
        {this.state.openField ? (
          ""
        ) : (
          <Button
            icon="comment alternate outline"
            primary
            size="mini"
            circular
            onClick={() => {
              this.setState({ openField: true });
            }}
          />
        )}
      </Comment.Group>
    );
  }
}

export default Comments;
