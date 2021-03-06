import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import Navbar from "./components/Navbar/Navbar";
import * as serviceWorker from "./serviceWorker";
import WithSession from "./components/WithSession";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import TweetForm from "./components/Post/TweetForm";
import TweetUpdateForm from "./components/Post/TweetUpdateForm";
import ResultForm from "./components/Result/ResultForm";
import MyPage from "./components/MyPage/MyPage";
import UserPage from "./components/MyPage/UserPage";
import FavList from "./components/Favotites/FavList";
import DetailPage from "./components/DetailPage/DetailPage";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ netWorkError }) => {
    if (netWorkError) {
      if (netWorkError.statusCode === 401) {
        localStorage.removeItem("token");
      }
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Navbar session={session} />
    <Switch>
      {/* session is from withSession. */}
      <Route path="/" exact render={() => <App session={session} />} />
      {/* refetch is from react-apollo. */}
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      {/* <Route path="/mypage" exact render={() => <MyPage session={session} />} /> */}
      <Route
        path="/post"
        exact
        render={() => <TweetForm session={session} />}
      />
      <Route path="/user" exact render={() => <MyPage session={session} />} />
      <Route
        path="/user/favorites"
        exact
        render={() => <FavList session={session} />}
      />
      <Route
        path="/user/:userId"
        exact
        render={() => <UserPage session={session} />}
      />
      <Route
        path="/post/edit/:id"
        exact
        render={() => <TweetUpdateForm session={session} />}
      />

      <Route
        path="/result/update/:tweetId"
        exact
        render={() => <ResultForm session={session} />}
      />
      <Route path="/:tweetId" component={DetailPage} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const RootWithSession = WithSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
