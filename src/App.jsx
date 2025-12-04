import { createContext, useContext, useEffect, useState } from "react";
import "./index.css";
import Myform from "./Myform";
import { ToastContainer, toast, Bounce } from "react-toastify";
export const myContext = createContext();
import axios from "axios";
import Dashboard from "./Dashboard";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState(false);
  const [developer, setDeveloper] = useState([]);
  const [search, setSearch] = useState([]);
  const API_URL = "https://talrn-backend-1.onrender.com/developers";

  const fetchDevelopers = async () => {
    try {
      const res = await axios.get(API_URL);
      setDeveloper(res.data.developers);
      console.log("Fetched developers:", developer); // log actual response
    } catch (err) {
      console.log(err);
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

  const developerError = () => {
    toast.error("All the fields are required", {
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

  const validateForm = (e) => {
    e.preventDefault();
    if (!name || !role || !techStack || !experience) {
      developerError();
      setError(true);
      return
    }



    const techStackArr = techStack.split(",");

    fetchDevelopers()
    const developers = {
      name: name,
      role: role,
      techStack: techStackArr,
      experience: experience,
    };

    axios
      .post(API_URL, developers)
      .then((response) => {
        fetchDevelopers()
        developerSuccess();
        console.log("Developer Added", response.data);
      })
      .catch((error) => console.log("Error adding developer", error));

    setName("");
    setRole("");
    setExperience("");
    setTechStack("");

    console.log(API_URL);
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
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/developer" element={<Myform></Myform>}></Route>
        </Routes>
        <ToastContainer limit={2} />
      </div>
    </myContext.Provider>
  );
}

export default App;
