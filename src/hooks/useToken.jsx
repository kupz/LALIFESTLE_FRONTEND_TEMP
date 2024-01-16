import React from "react";
import { useCookies } from "react-cookie";

function useToken() {
  const [cookies] = useCookies("account");
  if (cookies.account) {
    return cookies.account.token;
  }
  return null;
}

export default useToken;
