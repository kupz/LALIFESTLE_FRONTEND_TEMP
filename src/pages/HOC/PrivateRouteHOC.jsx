import React, { useState } from "react";
// import { test_token } from "../../api/authApi";
import useToken from "../../hooks/useToken";
import { test_token } from "../../api/authApi";

function PrivateRouteHOC(Component) {
  return function ValidateUser() {
    // get usertoken if there is
    const userToken = useToken();
    // console.log(userToken);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (userToken) {
      test_token(userToken).then((res) => {
        // console.log(res);
        if (res) {
          setIsAuthenticated(true);
        }
      });
    } else {
      window.location.href = "/login";
    }
    return isAuthenticated && <Component />;
  };
}

export default PrivateRouteHOC;
