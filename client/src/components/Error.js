import React from "react";

const Error = ({ error }) => (
  <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
    {error.message}
  </p>
);

export default Error;
