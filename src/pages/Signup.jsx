import { Button, colors, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../Context/AuthContext";

const Signup = () => {
  const naviagte = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const API_URL = "https://talrn-backend-nm58.onrender.com/auth/register";
  // const API_URL = "http://localhost:5000/auth/register";

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { userName, email, password };
      const { data } = await axios.post(API_URL, payload);

      loginUser(data.user, data.token);

      toast.success("Regsitered Successfully", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      naviagte("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Signup failed";

      toast.error(`${errorMsg}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen flex">
      <form
        className="rounded-3xl shadow-lg gap-5 flex flex-col items-center justify-around min-w-[50vh] min-h-[50vh]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-4xl">Register</h1>

        <TextField
          label="Enter Your name"
          type="string"
          value={userName}
          name="userName"
          size="small"
          onChange={(e) => setUserName(e.target.value)}
        ></TextField>
        <TextField
          label="Enter Your email"
          type="email"
          value={email}
          size="small"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></TextField>

        <TextField
          type="password"
          label="Enter your password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Button variant="contained" size="small" name="password" type="submit">
          Submit
        </Button>
        <p style={{ padding: "10px 0px" }}>
          Already have an account ?{" "}
          <span className="cursor-pointer text-blue-500">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
