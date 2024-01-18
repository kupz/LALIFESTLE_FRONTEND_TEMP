import { signal } from "@preact/signals-react";
import background from "../../assets/background.jpg";
import { useSignals } from "@preact/signals-react/runtime";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../api/authApi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const loginData = signal({
  username: "",
  password: "",
});

function LoginPage() {
  useSignals();

  // Navigate
  const navigate = useNavigate();

  // On change events for textbox
  const handleChange = (e) => {
    loginData.value = { ...loginData.value, [e.target.name]: e.target.value };
    // console.log(loginData.value)
  };

  const [cookie, setCookie] = useCookies(["account"]);

  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      setCookie("account", JSON.stringify(data));
      navigate("/");
    },
    onError: ()=> toast.error('Login Failed!')
  });

  const handleLogin = () => {
    loginMutation.mutate(loginData);
  };
  return (
    <div
      className="w-full min-h-screen bg-black overflow-hidden flex items-center justify-center flex-col gap-5"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="text-white text-3xl font-extrabold">LA LIFESTYLE</p>
      <div className="border-white border p-5 w-min flex flex-col gap-5 items-center backdrop-blur-sm">
        <p className="text-white font-bold text-2xl">Login</p>
        <input
          type="text"
          placeholder="Enter your Username"
          onChange={handleChange}
          name="username"
          value={loginData.value.username}
          className="py-1 px-2 shadow-md rounded-sm"
        />
        <input
          type="password"
          name="password"
          value={loginData.value.password}
          onChange={handleChange}
          placeholder="Enter your Password"
          className="py-1 px-2 shadow-md rounded-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <button
          className="bg-blue-300 px-5 py-2 rounded-sm"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
