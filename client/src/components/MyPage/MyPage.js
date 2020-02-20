import React, { Component } from "react";
import classes from "./mypage.css";
import { Image, Table, Button } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { GET_TWEETS, UPDATE_AVATAR } from "../../queries";
import userImage from "../../assets/user.svg";
import Loading from "../Loading";

class MyPage extends Component {
  state = {
    file: null,
    image: "",
    loading: false
  };

  handleSubmit = async (event, updateAvatar) => {
    event.preventDefault();
    const file = this.state.file;
    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "keeptrail");
    this.setState({ loding: true });
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      body: data
    });
    const uplodedfile = await res.json();
    this.setState({ image: uplodedfile.secure_url, loading: false });
    if (this.state.file) {
      await updateAvatar()
        .then(({ data }) => {
          console.log(data);
          this.props.history.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  uploadImage = async e => {
    this.setState({ file: e.target.files });
  };
  render() {
    return (
      <>
        <div className="MyPageContainer">
          <div className="ProfileContainer">
            <div className="ProfileImage">
              <Image
                src={
                  this.props.session.getCurrentUser.avatar
                    ? this.props.session.getCurrentUser.avatar
                    : userImage
                }
                size="medium"
              />
            </div>
            <div className="ImageUpload">
              <Mutation
                mutation={UPDATE_AVATAR}
                variables={{
                  _id: this.props.session.getCurrentUser._id,
                  avatar: this.state.image
                }}
              >
                {(updateAvatar, { data, loading, error }) => {
                  console.log(data);
                  if (loading) return <Loading />;
                  return (
                    <form
                      onSubmit={event => this.handleSubmit(event, updateAvatar)}
                    >
                      <input
                        type="file"
                        name="file"
                        onChange={e => this.uploadImage(e)}
                      />
                      <Button size="mini">update</Button>
                    </form>
                  );
                }}
              </Mutation>
            </div>
          </div>
        </div>
        <div className="OwnTrailContainer">
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <h2>{this.props.session.getCurrentUser.name}</h2>
          </div>
          {/* <div className="SortSection" style={classes.SortSection}>
            tag and hiduke
            <p>koko</p>
          </div> */}
          <Table color="teal">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>tag</Table.HeaderCell>
                <Table.HeaderCell>Likes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Query
                query={GET_TWEETS}
                variables={{ userId: this.props.session.getCurrentUser._id }}
              >
                {({ data, loading, error }) => {
                  if (loading) return <Loading />;
                  return data.getTweets.map(tweet => (
                    <Table.Row key={tweet._id}>
                      <Table.Cell>{tweet.image}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/${tweet._id}`}>{tweet.title}</Link>
                      </Table.Cell>
                      <Table.Cell>{tweet.tag}</Table.Cell>
                      <Table.Cell>{tweet.likes}</Table.Cell>
                    </Table.Row>
                  ));
                }}
              </Query>
            </Table.Body>
          </Table>

          {/* <div className="PagenationButton" style={classes.PagenationButton}>
            <Button size="mini" color="twitter" circular>
              Load more...
            </Button>
          </div> */}
        </div>
      </>
    );
  }
}

export default withRouter(MyPage);
