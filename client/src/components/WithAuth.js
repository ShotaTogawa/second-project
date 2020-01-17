import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { GET_CURRENT_USER } from "../queries";
import Loading from "./Loading";

const WithAuth = conditionFunc => Component => props => {
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return <Loading />;
      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>;
};

export default WithAuth;
