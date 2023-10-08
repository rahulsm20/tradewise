import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setUser } from "../store/authSlice";
import axios from "axios";
import { decodeUser } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleForm = () => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then(async (result) => {
        localStorage.setItem("username", email.slice(0, 5));
        sessionStorage.setItem("sessionToken", result.data.token);
        const user = await decodeUser(result.data.token);
        console.log(user);
        dispatch(setUser(user));
        dispatch(setAuthenticated(true));
        setLoading(false);
        navigate("/news");
      })
      .catch((err) => {
        setLoading(false);
        setFailed(true);
        console.log(err);
      });
    console.log(email, password);
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="p-10 bg-slate-950 text-white flex-col gap-5 items-center justify-center rounded-xl card border-2 border-slate-700 m-10">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl">
            Welcome to
            <span className="text-yellow-400 font-thin"> Tradewise</span>
          </h2>
        </div>
        <img src="/logo.png" className="w-10" alt="logo" />
        <p className="mt-3 text-xl">Login</p>
        <hr />
        <form
          className="flex flex-col gap-4 justify-center items-center mt-5"
          onSubmit={handleForm}
        >
          <input
            placeholder="Email"
            type="email"
            className="p-3 rounded-lg w-64 input input-bordered"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            className="p-3 rounded-lg w-64 input input-bordered"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {loading ? (
            <button
              type="button"
              className="flex align-middle justify-center bg-indigo-600"
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing
            </button>
          ) : (
            <button
              className="bg-gray-800 text-white rounded-lg p-3 btn btn-primary normal-case"
              onClick={handleForm}
            >
              Submit ➡️
            </button>
          )}
        </form>
        <p className="mt-3">
          Don't have an account?{" "}
          <a className="text-blue-500" href="/signup">
            Sign up here
          </a>
        </p>
        {failed ? (
          <span className="text-red-500">Please enter valid credentials</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Login;
