import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://sumeshserver2222.onrender.com/api/login";
      const response = await axios.post(url, data);
      const token = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      console.log("Token:", token);
      console.log("User ID:", userId);

      window.location = "/"; // Redirect to homepage after successful login
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-blue-100 flex items-center justify-center h-screen">
  <div className="container h-screen-75 bg-white w-full lg:w-4/5 border border-gray-300 rounded flex flex-wrap">
    <div className="w-full lg:w-1/2">
      <div className="form-wrapper flex items-center justify-center h-full">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="px-8 py-6">
            <h1 className="text-2xl font-semibold mb-6">Login Now</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full p-2 border border-gray-300 focus:outline-none active:outline-none focus:border-gray active:border-gray-500 mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-2 border border-gray-300 focus:outline-none active:outline-none focus:border-gray active:border-gray-500 mb-4"
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button type="submit" className="w-full bg-theme-blue text-white py-2 px-4 rounded hover:bg-theme-blue-dark focus:outline-none focus:bg-theme-blue-dark">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
    <div className="w-full lg:w-1/2 flex items-center justify-center">
  <div className="max-w-md bg-theme-blue p-8 rounded-lg shadow-lg">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back</h1>
    <Link to="/signup">
      <button type="button" className="w-full bg-white text-theme-blue py-2 px-4 rounded hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
        Sign Up
      </button>
    </Link>
  </div>
</div>
  </div>
</div>
  );
};

export default Login;


