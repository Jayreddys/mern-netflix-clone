import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const location = useLocation();
  const paragms = new URLSearchParams(location.search);
  const [email, setEmail] = useState(paragms.get("email") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();

    signup({ email, username, password });
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="h-screen signin-bg flex flex-col">
      {/* Header Section */}
      <header className="h-1/6 w-full flex justify-left items-center p-4 sm:p-6 lg:pl-24">
        <div>
          <Link to={"/"}>
            <img
              src="/netflix-logo.png"
              alt="netflix-logo"
              height={64}
              width={200}
              className="shadow-xl"
            />
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <main className="h-5/6 w-full flex justify-center items-center relative px-4">
        <div className="absolute left-1/2 -translate-x-1/2 h-auto w-full sm:w-4/5 md:w-3/5 lg:w-2/6 bg-black/70 rounded-md flex flex-col py-8 px-6 sm:px-8 justify-between">
          <h1 className="text-center text-3xl sm:text-4xl font-semibold text-white w-full mb-6">
            Sign Up
          </h1>

          {/* Form Section */}
          <form action="" onSubmit={handleSignUp}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-sm sm:text-base font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-sm sm:text-base font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none"
                placeholder="johndoe"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-sm sm:text-base font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none"
                placeholder="********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="bg-red-700 text-white w-full py-2 rounded-sm font-bold text-lg sm:text-xl">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-300">
              Already have an account?
              <span>
                <Link
                  to={"/login"}
                  className="text-red-700 font-bold ml-2 hover:underline"
                >
                  Sign In
                </Link>
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
