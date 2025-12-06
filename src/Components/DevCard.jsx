import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const DevCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

//   const API_URL = "http://localhost:5000/developer";
  const API_URL = "https://talrn-backend-nm58.onrender.com/developer";

  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDeveloper = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setDeveloper(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeveloper();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <Loader />
      </div>
    );

  if (!developer)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Developer not found
      </div>
    );

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6 bg-gray-100">
      <div className="w-full max-w-[90%] sm:max-w-xl md:max-w-3xl bg-white rounded-3xl shadow-xl p-6 md:p-8 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{padding : "5px 10px"}}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 text-sm"
        >
          ← Back
        </button>

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center py-5 mb-6">
          Developer Profile
        </h1>

        <div className="flex flex-col items-center gap-2 md:gap-4" style={{padding : "10px 0px"}}>
          <h2 className="text-2xl md:text-3xl font-semibold">{developer.name}</h2>
          <p className="text-gray-600 text-lg">{developer.role}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4" style={{padding : "0px 10px"}}>

          <div className="flex justify-between md:justify-start md:gap-4">
            <p className="font-semibold text-gray-700 w-32">Experience:</p>
            <p>{developer.experience} Years</p>
          </div>


          <div className="flex justify-between md:justify-start md:gap-4">
            <p className="font-semibold text-gray-700 w-32">Joining Date:</p>
            <p>{new Date(developer.joiningDate).toLocaleDateString()}</p>
          </div>


          <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
            <p className="font-semibold text-gray-700 w-32">Tech Stack:</p>
            <p className="text-gray-800 break-words">{developer.techStack?.join(", ")}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-gray-700">Description:</p>
            <p className="text-gray-800 break-words">{developer.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevCard;
