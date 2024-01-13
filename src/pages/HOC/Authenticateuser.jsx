import React from "react";
import Dashboard from "../dashboard";

function Authenticateuser() {
  const authenticated = true;

  if (!authenticated) {
    return (
      <h1>
        You are not Authorize to access this page please Login your account
        first
      </h1>
    );
  } else {
    return <Dashboard />
  }
}

export default Authenticateuser;
