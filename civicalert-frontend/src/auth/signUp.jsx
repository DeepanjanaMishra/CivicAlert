import React, { useState } from "react";

const Signup = ({ goToLogin }) => {

  const [name, setName] = useState("");
  const [role, setRole] = useState("Citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {

    console.log("Name:", name);
    console.log("Role:", role);
    console.log("Email:", email);
    console.log("Password:", password);

    // Later connect backend here

    alert("Signup successful!");

    goToLogin(); // return to login

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">


      {/* MAIN CARD */}
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">


        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-500 text-white p-12">


          <img
            src="/logo.png"
            alt="CivicAlert Logo"
            className="w-700 mb-6 drop-shadow-xl"
          />


          <p className="text-center text-lg opacity-90">

            Join CivicAlert and help  
            <br />
            improve civic services

          </p>


        </div>



        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10">


          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Signup
          </h2>



          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />



          {/* ROLE */}
          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option>Citizen</option>
            <option>Authority</option>
            <option>Admin</option>

          </select>



          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />



          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />



          {/* SIGNUP BUTTON */}
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md"
          >

            Signup

          </button>



          {/* LOGIN LINK */}
          <p className="text-center mt-6 text-gray-600">

            Already have an account?

            <span
              onClick={goToLogin}
              className="text-blue-600 font-semibold cursor-pointer ml-2 hover:underline"
            >

              Login

            </span>

          </p>


        </div>


      </div>


    </div>

  );

};

export default Signup;