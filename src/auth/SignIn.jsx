import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/images/cinco-logo.png";
import { loggWebAdmin } from "../redux/slices/adminSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [signInAdmin, setSignInAdmin] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInput = (e) => {
    setSignInAdmin({ ...signInAdmin, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInAdmin.usernameOrEmail || !signInAdmin.password) {
      alert("Fields cannot be empty");
      return;
    }
    dispatch(loggWebAdmin(signInAdmin)).then((action) => {
      if (action.type === "user/loggWebAdmin/fulfilled") {
        navigate("/dashboard");
      }
    });
  };


  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={Logo} alt="" />
      </div>
      <div className="p-3 max-w-lg mx-auto">
        <p className="text-center text-2xl text-gray-500 p-2">Super Admin</p>
        {error === "Refresh token is required" || "Invalid refresh token" ? "" : error && (
  <p className="text-red-500 text-sm text-center">{error}</p>
)}
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <label>
            <input
              type="text"
              name="usernameOrEmail"
              className="w-full border rounded-lg p-2"
              placeholder="Name or Email"
              value={signInAdmin.usernameOrEmail}
              onChange={handleInput}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              className="w-full border rounded-lg p-2"
              placeholder="Password"
              value={signInAdmin.password}
              onChange={handleInput}
            />
          </label>
          <button
            type="submit"
            className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="w-full flex justify-between text-sm">
          <span>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600">
              Sign Up
            </Link>
          </span>
          <Link to="/forgot-password" className="text-blue-600">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
