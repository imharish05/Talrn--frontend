import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../App.jsx";
import { Button, TextField, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader.jsx";

const Dashboard = () => {
  const { developer, loading, setLoading, fetchDevelopers } =
    useContext(myContext);

  const [search, setSearch] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [sortExperience, setSortExperience] = useState("");


  const [visibleCount, setVisibleCount] = useState(10);

  const navigate = useNavigate();
  // const API_URL = "http://localhost:5000/developer";
  const API_URL = "https://talrn-backend-nm58.onrender.com/developer";

  useEffect(() => {
    fetchDevelopers();
  }, []);


  useEffect(() => {
    setVisibleCount(10);
  }, [search, searchRole, sortExperience]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 20;

      if (bottom) {
        setVisibleCount((prev) => prev + 10); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredDevelopers = developer
    .filter((dev) => {
      const matchSearch =
        dev.name?.toLowerCase().includes(search) ||
        dev.techStack?.some((tech) =>
          tech.toLowerCase().includes(search)
        );

      const roleSearch =
        !searchRole ||
        dev.role?.toLowerCase() === searchRole.toLowerCase();

      return matchSearch && roleSearch;
    })
    .sort((a, b) => {
      if (sortExperience === "Low") return a.experience - b.experience;
      if (sortExperience === "High") return b.experience - a.experience;
      return 0;
    });


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="Dashboard flex flex-col justify-around items-center w-min-screen h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-4xl text-center mb-4">Dashboard</h1>

      <div className="Datas w-[95vw] min-h-[85vh]">
        <div className="row flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-0 mb-4 gap-2">
          <h1 className="text-lg sm:text-3xl">Developers</h1>

          <div className="bar flex flex-row flex-wrap justify-between items-center gap-2 w-full sm:w-auto">
            <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              className="flex-1 w-full sm:w-auto text-sm sm:text-base"
            />

            <TextField
              select
              label="Role"
              size="small"
              className="flex-1 w-full sm:w-auto text-sm sm:text-base"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Full-Stack">Full-Stack</MenuItem>
            </TextField>

            <TextField
              select
              label="Order by"
              size="small"
              value={sortExperience}
              className="flex-1 w-full sm:w-auto text-sm sm:text-base"
              onChange={(e) => setSortExperience(e.target.value)}
              fullWidth
            >
              <MenuItem value="High">High to Low</MenuItem>
              <MenuItem value="Low">Low to High</MenuItem>
            </TextField>

            <Link to="/developer" className="w-full sm:w-auto">
              <Button
                variant="contained"
                size="small"
                className="w-full sm:w-auto"
              >
                <span className="text-sm sm:text-base mr-1">+</span>
                Create
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="w-full h-auto overflow-x-hidden"
          style={{ marginTop: "15px" }}
        >
          <table className="min-w-full border border-gray-400 rounded-lg bg-white">
            <thead
              className="bg-gray-100 border-b border-gray-400"
              style={{ padding: "20px" }}
            >
              <tr className="text-center">
                <th className="px-8 py-4 text-sm sm:text-lg font-semibold text-gray-700 border-r border-gray-400">
                  Name
                </th>
                <th className="px-8 py-4 text-sm sm:text-lg font-semibold text-gray-700 border-r border-gray-400">
                  Role
                </th>
                <th className="px-8 py-4 text-sm sm:text-lg font-semibold text-gray-700 border-r border-gray-400">
                  Tech Stack
                </th>
                <th className="px-8 py-4 text-sm sm:text-lg font-semibold text-gray-700">
                  Experience
                </th>
                <th className="px-8 py-4 text-sm sm:text-lg font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">
              {filteredDevelopers.length > 0 ? (
                filteredDevelopers
                  .slice(0, visibleCount)
                  .map((data) => (
                    <tr
                      key={data._id}
                      onClick={() => navigate(`/developer/${data._id}`)}
                      className="h-16 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <td className="text-center px-8 py-6 text-sm sm:text-base border-r border-gray-300">
                        {data.name}
                      </td>

                      <td className="text-center px-8 py-6 text-sm sm:text-base border-r border-gray-300">
                        {data.role}
                      </td>

                      <td className="text-center px-8 py-6 text-sm sm:text-base border-r border-gray-300">
                        {data.techStack.join(", ")}
                      </td>

                      <td className="text-center px-8 py-6 text-sm sm:text-base">
                        {data.experience} yrs
                      </td>

                      <td
                        className="text-center px-6 py-4 gap-4 border-l border-gray-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span
                          className="text-blue-500 hover:underline cursor-pointer"
                          onClick={() =>
                            navigate(`/developer/edit/${data._id}`)
                          }
                        >
                          Edit
                        </span>

                        {" || "}

                        <span
                          className="text-red-500 hover:underline cursor-pointer"
                          onClick={() => handleDelete(data._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-8 text-center text-gray-500 text-sm sm:text-base"
                  >
                    No developers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {visibleCount < filteredDevelopers.length && (
            <p className="text-center py-4 text-gray-500">Loading more...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
