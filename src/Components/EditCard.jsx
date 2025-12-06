import React, { useContext, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { myContext } from "../App.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDeveloper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = "https://talrn-backend-nm58.onrender.com/developer";
//   const API_URL = "http://localhost:5000/developer";

  const token = localStorage.getItem("token");

  const {
    name,
    setName,
    role,
    setRole,
    techStack,
    setTechStack,
    experience,
    setExperience,
    description,
    setDescription,
    joiningDate,
    setJoiningDate,
    fetchDevelopers,
  } = useContext(myContext);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        setName(data.name || "");
        setRole(data.role || "");
        setTechStack(data.techStack?.join(", ") || "");
        setExperience(data.experience || "");
        setDescription(data.description || "");
        setJoiningDate(data.joiningDate?.split("T")[0] || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchDeveloper();
  }, [
    id,
    setName,
    setRole,
    setTechStack,
    setExperience,
    setDescription,
    setJoiningDate,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        role,
        techStack: techStack.split(",").map((t) => t.trim()),
        experience,
        description,
        joiningDate,
      };

      await axios.put(`${API_URL}/edit/${id}`,payload,{
        headers : {
            Authorization : `Bearer ${token}`
        }
      })

      fetchDevelopers();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        style={{ padding: "15px" }}
        className="flex flex-col gap-5 bg-white rounded shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl py-5 text-center">EDIT DEVELOPER</h1>

        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
        >
          <MenuItem value="Frontend">Frontend</MenuItem>
          <MenuItem value="Backend">Backend</MenuItem>
          <MenuItem value="Full-Stack">Full-Stack</MenuItem>
        </TextField>

        <TextField
          label="Tech Stack"
          variant="outlined"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />

        <TextField
          label="Experience"
          type="number"
          inputProps={{ min: 0, max: 50 }}
          variant="outlined"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <TextField
          label="Description"
          type="string"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Joining Date"
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>

        <Button
          fullWidth
          style={{ color: "black" }}
          onClick={() => navigate("/")}
        >
          Go to Dashboard
        </Button>
      </form>
    </div>
  );
};

export default EditDeveloper;
