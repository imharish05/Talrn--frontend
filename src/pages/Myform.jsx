import react, { useContext } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { myContext } from "../App.jsx";
import { Link } from "react-router-dom";

const Myform = () => {
  let {
    name,
    setName,
    role,
    setRole,
    techStack,
    setTechStack,
    experience,
    setExperience,
    validateForm,
    description,
    setDescription,
    joiningDate,
    setJoiningDate,
    fetchDevelopers,
  } = useContext(myContext);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => {
          validateForm(e)
        }}
        style={{ padding: "15px" }}
        className="flex flex-col gap-5 bg-white rounded shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl py-5 text-center">ADD DEVELOPER</h1>
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
          onChange={(e) => {
            setExperience(e.target.value);
          }}
        />
        <TextField
          label="Description"
          type="string"
          variant="outlined"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          label="Joining Date"
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={joiningDate}
          onChange={(e) => {
            console.log(joiningDate);
            setJoiningDate(e.target.value);
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>

        <Link to={"/"} className="text-center">
          <Button fullWidth style={{ color: "black" }}>
            Go to Dashboard
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Myform;
