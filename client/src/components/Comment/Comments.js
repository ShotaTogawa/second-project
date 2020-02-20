import React, { Component } from "react";
import { Button, Comment, Form, Header, List } from "semantic-ui-react";
// 下にも書いていますが、この様に宣言してあげるとみやすくなるかと思います
import { Content, Avater, Author, Metadata, Text } from "semantic-ui-react/Comment";
import { Mutation } from "react-apollo";
import { ADD_COMMENT, DELETE_COMMENT } from "../../queries";
import Loading from "../Loading";
import userImage from "../../assets/user.svg";

class Comments extends Component {
  state = {
    comment: "",
    openField: false
  };

  componentDidMount() {}

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

  // コードをコメントアウトして残しておく際は、なぜ残すのかが書いてあると後で見たメンバーが助かります
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
          {/* <Comment.~> の記述が冗長なので、import の仕方を変えると見やすくなると思います。上に例を書いておきます。 */}
          <Comment.Avatar
            src={comment.user.avatar ? comment.user.avatar : userImage}
          />
          <Comment.Content>
            <Comment.Author as="a">{comment.user.name}</Comment.Author>
            <Comment.Metadata>
              <div>{comment.createdAt}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
            {comment.userId === this.props.userId ? (
              <List horizontal size="mini">
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
