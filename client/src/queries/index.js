import { gql } from "apollo-boost";

/* User's query */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
    }
  }
`;

/* User's mutations */

/* Tweet's query */

/* Tweet's mutations */

/* Comment's query */

/* Comment's mutations */

/* Result's query */

/* Result's mutations */
