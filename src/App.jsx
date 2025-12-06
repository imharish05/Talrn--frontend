import { createContext, useContext, useEffect, useState } from "react";
import "./index.css";
import Myform from "./pages/Myform";
import { ToastContainer, toast, Bounce } from "react-toastify";
export const myContext = createContext();
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import { Route, Router, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import DevCard from "./Components/DevCard";
import EditDeveloper from "./Components/EditCard";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState(false);
  const [developer, setDeveloper] = useState([]);
  const [search, setSearch] = useState([]);
  const [description, setDescription] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://talrn-backend-nm58.onrender.com/developers";
  // const API_URL = "http://localhost:5000/developers";

  const [loggedIn, setLoggedIn] = useState(false);

  const fetchDevelopers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeveloper(res.data.developers);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const developerSuccess = () => {
    toast.success("Developer Added Successfully", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const validateForm = async (e) => {
    e.preventDefault();
    try {
      if (!name || !role || !techStack || !experience) {
        developerError();
        setError(true);
        return;
      }

      const techStackArr = techStack.split(",");

      fetchDevelopers();
      const developers = {
        name: name,
        role: role,
        techStack: techStackArr,
        experience: Number(experience),
        description: description,
        joiningDate: joiningDate,
      };

      await axios.post(API_URL, developers);

      await fetchDevelopers();

      fetchDevelopers();
      developerSuccess();
      setName("");
      setRole("");
      setExperience("");
      setTechStack("");
      setDescription("");
      setJoiningDate("");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Logged in Failed";

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
    <myContext.Provider
      value={{
        name,
        setName,
        role,
        setRole,
        techStack,
        setTechStack,
        experience,
        setExperience,
        error,
        setError,
        validateForm,
        developer,
        setDeveloper,
        search,
        setSearch,
        description,
        setDescription,
        joiningDate,
        setJoiningDate,
        fetchDevelopers,
        loading,
        setLoading,
      }}
    >
      <ToastContainer limit={2} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard></Dashboard>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/developer"
            element={
              <ProtectedRoute>
                <Myform></Myform>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/developer/:id"
            element={
              <ProtectedRoute>
                <DevCard></DevCard>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/developer/edit/:id"
            element={
              <ProtectedRoute>
                <EditDeveloper></EditDeveloper>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </myContext.Provider>
  );
}

export default App;
