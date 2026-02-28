import { useState } from "react";

export default function Signup({ goToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {

    if(!name || !email || !password){

      alert("Please fill all fields");
      return;

    }

    alert("Signup successful");

    goToLogin();

  };


  return (

    <div className="h-screen flex">


      {/* LEFT */}

      <div className="w-1/2 bg-blue-700 flex flex-col justify-center items-center text-white">

        <img
          src="/logo.png"
          className="w-40 mb-6"
        />

        <h1 className="text-4xl font-bold">
          CiviCAlert
        </h1>

        <p className="mt-4">
          Create your account
        </p>

      </div>



      {/* RIGHT */}

      <div className="w-1/2 flex justify-center items-center">

        <div className="w-96">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Signup
          </h2>


          <input
            placeholder="Full Name"
            className="w-full p-2 border rounded mb-4"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />


          <input
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />


          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />


          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >

            Signup

          </button>


          <div className="text-center my-4 text-gray-400">
            or
          </div>


          <p className="text-center text-gray-600">

            Already have an account?

            <button
              onClick={goToLogin}
              className="ml-2 text-blue-600 font-semibold hover:underline"
            >

              Login

            </button>

          </p>

        </div>

      </div>

    </div>

  );

}