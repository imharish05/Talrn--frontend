import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loginUser} = useContext(AuthContext)

  // const API_URL = "http://localhost:5000/auth/login";
  const API_URL = "https://talrn-backend-nm58.onrender.com/auth/login";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };

      const {data} = await axios.post(API_URL, payload);
      loginUser(data.user,data.token)
      toast.success("Logged in Successfully", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/dashboard",{ replace: true });
    } catch (err) {
      const errMsg = err.response?.data?.message || "Log in Failed";
      toast.error(`${errMsg}`, {
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
        <h1 className="text-4xl">Log In</h1>

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
        <Button variant="contained" size="small" type="submit">
          Submit
        </Button>

                <p style={{ padding: "10px 0px" }}>
          Don't have an account ?{" "}
          <span className="cursor-pointer text-blue-500">
            <Link to={"/"}>Register</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
