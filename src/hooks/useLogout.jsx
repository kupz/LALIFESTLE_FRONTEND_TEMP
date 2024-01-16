import { useCookies } from "react-cookie";

const useLogout = () => {
  const [cookies, removeCookies] = useCookies(["account"]);

  const handleLogout = () => {
    console.log("fire logout");
    removeCookies("account");
    window.location.reload()
  };

  return handleLogout;
};

export default useLogout;
