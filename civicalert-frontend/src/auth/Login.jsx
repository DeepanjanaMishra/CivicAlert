import React, { useState } from "react";

const Login = () => {

  const [role, setRole] = useState("Citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    console.log("Role:", role);
    console.log("Email:", email);
    console.log("Password:", password);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">


        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 text-white p-12">

          <img
            src="/logo.png"
            alt="logo"
            className="w-24 mb-6"
          />

          <h1 className="text-4xl font-bold mb-4">
            CiviCAlert
          </h1>

          <p className="text-center text-lg opacity-90">
            Emotion & Context Aware <br />
            Civic Complaint System
          </p>

        </div>


        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 p-10">

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Login
          </h2>


          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option>Citizen</option>
            <option>Authority</option>

          </select>


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >

            Login

          </button>


          <p className="text-center mt-6 text-gray-600">

            Don't have an account?

            <span className="text-blue-600 font-semibold cursor-pointer ml-2">

              Sign up

            </span>

          </p>


        </div>


      </div>

    </div>

  );

};

export default Login;