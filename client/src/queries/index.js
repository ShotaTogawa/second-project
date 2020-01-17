import { gql } from "apollo-boost";

/* User's query */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      name
      email
    }
  }
`;

/* User's mutations */
export const SIGNUP_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

/* Tweet's query */

/* Tweet's mutations */

/* Comment's query */

/* Comment's mutations */

/* Result's query */

/* Result's mutations */
