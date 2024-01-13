import { signal } from "@preact/signals-react";
import background from "../../assets/background.jpg";
import { useSignals } from "@preact/signals-react/runtime";

const email = signal(1);

function LoginPage() {
  useSignals();
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
          placeholder="Enter your Email address"
          className="py-1 px-2 shadow-md rounded-sm"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="py-1 px-2 shadow-md rounded-sm"
        />
        <button
          className="bg-blue-300 px-5 py-2 rounded-sm"
          onClick={() => {
            email.value = email.value + 1;
            console.log(email.value);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
