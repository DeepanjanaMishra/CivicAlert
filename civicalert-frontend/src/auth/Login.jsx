import React, { useState } from "react";

const Login = ({ goToSignup, onLogin }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

  try {

    const response = await fetch("http://localhost:5000/api/auth/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email,
        password: password
      })

    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }
    console.log("Logged in user:", data.user);

    // store token
    localStorage.setItem("token", data.token);

    // send user info to app
    onLogin(data.user);

  } catch (error) {

    console.error(error);
    alert("Server error");

  }

};


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">


      {/* MAIN CARD */}
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">


        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-500 text-white p-12">


          <img
            src="/logo.png"
            alt="CivicAlert Logo"
            className="w-700 mb-6 drop-shadow-xl"
          />


          <p className="text-center text-lg opacity-90">

            AI-Powered Emotion & Context-Aware  
            <br />
            Civic Complaint System

          </p>


        </div>



        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 p-10">


          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Login
          </h2>


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md"
          >
            Login
          </button>


          <p className="text-center mt-6 text-gray-600">

            Don't have an account?

            <span
              onClick={goToSignup}
              className="text-blue-600 font-semibold cursor-pointer ml-2 hover:underline"
            >
              Sign up
            </span>

          </p>


        </div>


      </div>


    </div>

  );

};

export default Login;