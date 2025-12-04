import React, { useContext, useEffect, useState } from "react";
import { myContext } from "./App";
import { Button, TextField, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { developer } = useContext(myContext);
  const [search, setSearch] = useState("");

  const [searchRole, setSearchRole] = useState("");

  const filteredDevelopers = developer.filter((dev) => {
    const matchSearch =
      dev.name.toLowerCase().includes(search.toLowerCase()) ||
      dev.techStack.some((tech) =>
        tech.toLowerCase().includes(search.toLowerCase())
      );

    const roleSearch =
      searchRole === "" || dev.role.toLowerCase() === searchRole.toLowerCase();

    return matchSearch && roleSearch;
  });

  return (
    <div className="Dashboard flex flex-col justify-around items-center w-min-screen h-min-screen">
      <h1 className="text-2xl sm:text-4xl text-center mb-4">Dashboard</h1>

      <div className="Datas w-[95vw] min-h-[85vh]">
        <div className="row flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-0 mb-4 gap-2">
          <h1 className="text-lg sm:text-3xl">Developers</h1>

          <div className="bar flex flex-row flex-wrap justify-between items-center gap-2 w-full sm:w-auto">
            <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
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

            <Link to={"/developer"} className="w-full sm:w-auto">
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
          className="w-full min-h-[70vh] overflow-x-hidden"
          style={{ marginTop: "15px" }}
        >
          <table className="min-w-full border border-gray-400 rounded-lg bg-white">
            <thead className="bg-gray-100 border-b border-gray-400">
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
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">
              {filteredDevelopers.length > 0 ? (
                filteredDevelopers.map((data) => (
                  <tr
                    key={data._id}
                    className="h-16 hover:bg-gray-50 transition"
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-8 text-center text-gray-500 text-sm sm:text-base"
                  >
                    No developers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
